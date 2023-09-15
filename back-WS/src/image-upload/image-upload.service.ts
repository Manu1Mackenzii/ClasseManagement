import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import * as aws from 'aws-sdk';
import * as sharp from 'sharp';
import { UsersService } from 'src/users/users.service';
import { SvcService } from 'src/user-services/service.service';

export enum UploadType {
  PROFILE = 'PROFILE',
  SERVICE = 'SERVICE',
  COVER = 'COVER',
}

@Injectable()
export class ImageUploadService {

  protected s3: any;
  protected upload: any;
  protected SIZES: string[] = [
    '250X250',
    '350X150',
    '640X360',
    '900X900'
  ]

  constructor(
    private configService: ConfigService,
    private readonly svcService: SvcService,
    private readonly userService: UsersService
  ) {

    const spacesEndpoint = new aws.Endpoint(process.env.AWS_S3_URL);
    this.s3 = new aws.S3({
      endpoint: spacesEndpoint
    });
  }

  async uploadFile(file: Express.Multer.File, id: string, type: UploadType) {
    try {
      const filesUploaded = await this.resizeFileAndUpload(file)
      const images = [];
      filesUploaded.forEach((upload) => {
        const size = upload.key.split('/').shift();
        images.push({ url: upload.Location, size })
      })
      switch (type) {
        case UploadType.SERVICE:
          return this.svcService.update(id, { images });
        case UploadType.PROFILE:
          return this.userService.update(id, { images });
        case UploadType.COVER:
          return this.userService.update(id, { covers: images });
        default:
          break
      }
    } catch (error) {
      Logger.error('Upload file -> ', error);
      return new ForbiddenException(error)
    }
  }

  private resizeFileAndUpload(file: Express.Multer.File): Promise<{ key: string, Location: string }[]> {
    let promises = [];
    this.SIZES.forEach((size) => {
      let [width, height] = size.split('X')
      let resize = sharp(file.buffer)
        .resize({ width: +width, height: +height })
        .withMetadata()
        .jpeg()
        .toBuffer().then((blob: Buffer) => {
          const [, ext] = file.mimetype.split('/');
          const params = {
            Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
            Key: `${size}/${v4()}_${Date.now()}.jpeg`,
            Body: blob,
            ACL: 'public-read',
          };
          return this.s3.upload(params).promise()
        })
      promises.push(resize)
    })
    return Promise.all(promises)
  }

  remove(key: string) {
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Key: String(key),
    };
    this.s3.deleteObject(params)
    return `This action removes a #${key} imageUpload`;
  }
}

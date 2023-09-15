import { Controller, Post, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageUploadService, UploadType } from './image-upload.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image-upload') // todo remove image upload
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('services/:id')
  async uploadPanelImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.imageUploadService.uploadFile(file, id, UploadType.SERVICE);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('profile/:id')
  async uploadUserProfil(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.imageUploadService.uploadFile(file, id, UploadType.PROFILE);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('user-cover/:id')
  async uploadUserCover(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.imageUploadService.uploadFile(file, id, UploadType.COVER);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageUploadService.remove(id);
  }
}

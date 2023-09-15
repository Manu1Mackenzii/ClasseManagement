import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './schemas/service.schema';



@Injectable()
export class SvcService {

  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>
  ) { }

  create(createServiceDto: ServiceDto) {
    try {
      return this.serviceModel.create({
        ...createServiceDto,
        created_at: Date.now(),
        updated_at: Date.now()
      });
    } catch (error) {
      return {
        success: false,
        error: error
      };
    }
  }

  findAll(user: any = null): Promise<Service[]> {
    let conditions = {};
    if (user) {
      conditions['userId'] = user.userId;
    }
    return this.serviceModel.find(conditions).exec();
  }

  findOne(serviceId: string): Promise<Service | undefined> {
    return this.serviceModel.findOne({
      serviceId: serviceId
    }, { __v: 0 }).exec();
  }

  // findByLocation(search: SearchServiceDto) {
  //   const {longitude, latitude} = search.coordinates
  //   const maxDistance = 1 // value in km

  //   const query = {
  //     location:
  //       { $near:
  //          {
  //            $geometry: { type: "Point",  coordinates: [ longitude, latitude ] },
  //            $maxDistance: 2000
  //          }
  //       },
  //   };

  //   if(search.service) {
  //     query['services'] =  {
  //         $elemMatch: {name: search.service}
  //     }
  //   }

  //   // TODO: make difference between user position and from where user going
  //   return this.serviceModel.find(query).select([
  //     'serviceId',
  //     'busyPlaces',
  //     'places',
  //     'address',
  //     'placeType',
  //     'name', 
  //     'images', 
  //     'location',
  //     'services',
  //     'createdAt',
  //     'updatedAt'
  //   ]).exec();
  // }

  update(serviceId: string, service: UpdateServiceDto | any) {
    return this.serviceModel.findOneAndUpdate({
      _id: serviceId,
    }, {
      ...service,
      updatedAt: Date.now()
    }, {
      new: true
    }).exec();
  }

  async remove(id: string) {
    const service = await this.serviceModel.findOne({ id })
    if (!service) {
      throw new NotFoundException({
        message: 'Panel does not exist'
      })
    }
    await this.serviceModel.deleteOne({ id }).exec();
  }

  async removeAllByUser(clientId: string) {
    if (!this.serviceModel.findOne({ clientId })) {
      throw new NotFoundException({
        message: 'User not exist'
      })
    }
    await this.serviceModel.deleteMany({ clientId }).exec();
  }
}
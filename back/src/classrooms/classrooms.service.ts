import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ClassroomDocument, Classroom } from './schemas/classroom.schema';


@Injectable()
export class ClassroomsService {

  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
    // private svcService: SvcService
  ) { }

  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    let classFound = await this.classroomModel.findOne({ id: createClassroomDto.id });

    if (classFound) {
      throw new UnauthorizedException({
        message: 'Classroom already exists with same id'
      });
    } else {
      const createdClassroom = new this.classroomModel({
        ...createClassroomDto,
        id: new mongoose.Types.ObjectId(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      return createdClassroom.save();
    }
  }


  async findAll(): Promise<Classroom[]> {
    return await this.classroomModel.find().exec();
  }

  async findByClassroomId(id: string): Promise<Classroom> {
    return await this.classroomModel.findOne({  id }, { _id: 0, __v: 0 }).exec();
  }

 
  async update(id: string, updateClassroomDto: UpdateClassroomDto): Promise<Classroom> {
    const classroom = await this.classroomModel.findOne({ id }).exec();
    if (updateClassroomDto.label && updateClassroomDto.label !== classroom.label) {
      let classroomFound = await this.classroomModel.findOne({ label: updateClassroomDto.label });
      if (classroomFound && classroomFound.id !== id) {
        throw new UnauthorizedException({
          message: 'Classroom already exists '
        });
      }
    }
    return this.classroomModel.findOneAndUpdate({ id }, {
      ...updateClassroomDto,
      // id : new mongoose.Types.ObjectId(),
      updatedAt: Date.now()
    }, {
      new: true
    }).exec();
  }


  async remove(id: string) {
    const classroom = await this.classroomModel.findOne({ id: id })
    if (!classroom) {
      throw new NotFoundException({
        message: 'Classroom does not exist'
      })
    }
    await this.classroomModel.deleteOne({ id: id }).exec();
    // await this.svcService.removeAllByUser(id)
  }

}

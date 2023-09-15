import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument, StudentSource } from './schemas/student.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class StudentsService {


  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    // private svcService: SvcService
    ) { }


    findByStudentId(id: string): Promise<Student | undefined> {
      return this.studentModel.findOne({ id }, {_id: 0, __v: 0}).exec();
  }


  findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
}

  findOne(username: string, selectPassword = false): Promise<Student | undefined> {
    if (selectPassword) {
        return this.studentModel.findOne({ email: username }).select('+password').exec();
    } else {
        return this.studentModel.findOne({ email: username }).exec();
    }
}

async update(userId: string, updateStudentDto: UpdateStudentDto) {
  const teacher = await this.studentModel.findOne({ userId }).exec();
  if(updateStudentDto.email && updateStudentDto.email !== Student.email) {
      let userFound = await this.studentModel.findOne({ email: updateStudentDto.email });
      if (userFound && userFound.id !== userId) {
          throw new UnauthorizedException({
              message: 'User already exists with same email or username'
          });
      }
      updateStudentDto['username'] = updateStudentDto.email
  }
  return this.studentModel.findOneAndUpdate({ userId }, {
      ...updateStudentDto,
      updatedAt: Date.now()
  }, {
      new: true
  }).exec();
}

  async remove(id: string) {
    const user = await this.studentModel.findOne({userId: id})
    if (!user) {
        throw new NotFoundException({
            message: 'User does not exist'
        })
    }
    await this.studentModel.deleteOne({userId: id}).exec();
    // await this.svcService.removeAllByUser(id)
}

  findByEmail(email: string): Promise<Student | undefined> {
    return this.studentModel.findOne({ email }, {_id: 0, __v: 0}).exec();
}





 async createStudent(createUserDto: CreateStudentDto) {

  let userFound = await this.studentModel.findOne({ id: createUserDto.id });

  if (userFound) {
      throw new UnauthorizedException({
          message: 'User already exists with same email or username'
      });
  } else {
     
    const studentCreate = new this.studentModel({
        ...CreateStudentDto,
          id: new mongoose.Types.ObjectId(),
          email: createUserDto.email,
        username: createUserDto.email,
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
            phone : createUserDto.phone,
          password : createUserDto.password,
          address : createUserDto.address,
          instruments : createUserDto.instruments,
          instrumentId : createUserDto.instrumentId,
          classroomId : createUserDto.classroomId,

     
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  return studentCreate.save();
}
}

private async createSocialStudent(createUserDto: CreateStudentDto) {
  if(!createUserDto.id) {
      throw new BadRequestException({
          message: 'userId is required'
      });
  }

  let userFound = await this.studentModel.findOne<Student>({ email: createUserDto.email });

  if (userFound) {
      if(
          userFound.id !== createUserDto.id
        //   || userFound.source !== createUserDto.source
      ) {
          throw new UnauthorizedException({
              message: 'User already exists with same email'
          });
      }
      return userFound
  } else {
      let user = await this.studentModel.create({
          ...createUserDto
      });
      return user;
  }
}


isProfileCompleted(student) {
  if (!student.firstname || !student.lastname) {
      return false;
  }
  return true;
}


}

/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher, TeacherDocument, TeacherSource } from './schemas/teacher.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import * as bcrypt from 'bcrypt';
import { Instrument } from 'src/instruments/schemas/instrument.schemas';
import { Classroom } from 'src/classrooms/schemas/classroom.schema';

@Injectable()
export class TeachersService {
  

    constructor(
        @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
        // @InjectModel('Instrument') private readonly instrumentModel: Model<Instrument>,
        // @InjectModel('Classroom') private readonly classroomModel: Model<Classrooms>,
        ) { }


        findAll(): Promise<Teacher[]> {
            return this.teacherModel.find().exec();
        }

        findOne(username: string, selectPassword = false): Promise<Teacher | undefined> {
            if (selectPassword) {
                return this.teacherModel.findOne({ email: username }).select('+password').exec();
            } else {
                return this.teacherModel.findOne({ email: username }).exec();
            }
        }

        findByTeacherId(id: string): Promise<Teacher | undefined> {
            return this.teacherModel.findOne({ id }, {_id: 0, __v: 0}).exec();
        }
    
        findByEmail(email: string): Promise<Teacher | undefined> {
            return this.teacherModel.findOne({ email }, {_id: 0, __v: 0}).exec();
        }

        async update(id: string, updateTeacherDto: UpdateTeacherDto) {
            const teacher = await this.teacherModel.findOne({ id }).exec();
            if(updateTeacherDto.email && updateTeacherDto.email !== Teacher.email) {
                let userFound = await this.teacherModel.findOne({ email: updateTeacherDto.email });
                if (userFound && userFound.id !== id) {
                    throw new UnauthorizedException({
                        message: 'User already exists with same email or username'
                    });
                }
                updateTeacherDto['username'] = updateTeacherDto.email
            }
            return this.teacherModel.findOneAndUpdate({ id }, {
                ...updateTeacherDto,
                updatedAt: Date.now()
            }, {
                new: true
            }).exec();
        }


        async remove(id: string) {
            const user = await this.teacherModel.findOne({id: id})
            if (!user) {
                throw new NotFoundException({
                    message: 'User does not exist'
                })
            }
            await this.teacherModel.deleteOne({id: id}).exec();
            // await this.svcService.removeAllByUser(id)
        }
  
        // async register(createTeacherDto: CreateTeacherDto) {
        //     switch (createTeacherDto.source) {
        //         case TeacherSource.APPLE_USER:
        //         case TeacherSource.GOOGLE_USER:
        //         case TeacherSource.FB_USER:
        //             return this.createSocialTeacher(createTeacherDto)
        //         case TeacherSource.MOBILE_USER:
        //         case TeacherSource.GOLDEN_USER:
        //             return this.createTeacher(createTeacherDto);
        //         default:
        //         throw new UnauthorizedException({
        //             message: 'User source is not accepted'
        //         });
        //     }
        // }
   

         async createTeacher(createUserDto: CreateTeacherDto){

            let userFound = await this.teacherModel.findOne({ id: createUserDto.id });
    
            if (userFound) {
                throw new UnauthorizedException({
                    message: 'Teacher already exists with same id '
                });
            } else {
            
       
            const teacherCreate = new this.teacherModel({
              ...CreateTeacherDto,
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
      
            return teacherCreate.save();
          }
        }
      

         async createSocialTeacher(createUserDto: CreateTeacherDto) {
            if(!createUserDto.id) {
                throw new BadRequestException({
                    message: 'id is required'
                });
            }
    
            let userFound = await this.teacherModel.findOne<Teacher>({ id: createUserDto.id });
    
            if (userFound) {
                if(
                    userFound.id !== createUserDto.id
                    // || userFound.source !== createUserDto.source
                ) {
                    throw new UnauthorizedException({
                        message: 'User already exists with same id'
                    });
                }
                return userFound
            } else {
                let user = await this.teacherModel.create({
                    ...createUserDto
                });
                return user;
            }
        }

   
        isProfileCompleted(teacher) {
            if (!teacher.firstname || !teacher.lastname) {
                return false;
            }
            return true;
        }

}

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CourseSession, CourseSessionDocument, CourseSessionSchema } from './schemas/CourseSession.schema';
import { ClassroomsController } from 'src/classrooms/classrooms.controller';
import { Classroom } from 'src/classrooms/schemas/classroom.schema';
import { Teacher } from 'src/teachers/schemas/teacher.schema';

@Injectable()
export class CourseSessionService {

  constructor(
    @InjectModel(CourseSession.name) private sessionModel: Model<CourseSessionDocument>,
  ) { }

  async create(createSessionDto: CreateSessionDto): Promise<CourseSession> {
    let classFound = await this.sessionModel.findOne({ id: createSessionDto.id });

    if (classFound) {
      throw new UnauthorizedException({
        message: 'This course session already exists with same id'
      });
    } else {
      const createdSession = new this.sessionModel({
        ...createSessionDto,
        id: new mongoose.Types.ObjectId(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      return createdSession.save();
    }
  }

  async findAll(): Promise<CourseSession[]> {
    return await this.sessionModel.find().exec();
  }

  async findById(id: string): Promise<CourseSession> {
    return await this.sessionModel.findOne({ id }, { id: 0, __v: 0 }).exec();
  }

  async update(id: number, updateSessionDto: UpdateSessionDto): Promise<CourseSession> {
    const session = await this.sessionModel.findOne({ id }).exec();
    if (updateSessionDto.id && updateSessionDto.label !== session.label) {
      let sessionFound = await this.sessionModel.findOne({ label: updateSessionDto.label });
      if (sessionFound && sessionFound.id !== id) {
        throw new UnauthorizedException({
          message: 'This course session already exists '
        });
      }
    }
    return this.sessionModel.findOneAndUpdate({ id }, {
      ...updateSessionDto,
      // id : new mongoose.Types.ObjectId(),
      updatedAt: Date.now()
    }, {
      new: true
    }).exec();
  }

  async remove(id: number) {
    const session = await this.sessionModel.findOne({ id: id })
    if (!session) {
      throw new NotFoundException({
        message: 'This course session does not exist'
      })
    }
    await this.sessionModel.deleteOne({ id: id }).exec();
    // await this.svcService.removeAllByUser(id)
  }


  async generateSessions(classroomId: string, classroom: Classroom) {
 
    let sessionFound = await this.sessionModel.findOne({ classroomId: classroomId });

    if (sessionFound) {
      throw new UnauthorizedException({
        message: 'This course session already exists with same classroom id'
      });
    } else {
      const numberOfSession = classroom.sceance;
      const startDate = classroom.dateDebut;
      const endDate = new Date(classroom.dateFin);
      const label = classroom.label;
      const instruments = classroom.instruments;
      const students = classroom.students;
      const teacher = classroom.teachers[0];
      const notice = " " ;
      const room = " ";
      const status = " ";

//redéfinir directement les variables

      const sessionDates = [];
      endDate.setHours(endDate.getHours() + 1);

      for (let i = 0; i < numberOfSession; i++) {
        const newSession = new CourseSession();

        newSession.classroomId = classroomId;
      //revoir signIn et enddDate et startDate
        newSession.signInDate = new Date();
        newSession.label = label;
        newSession.startDate = new Date(endDate);
        newSession.EndDate = new Date(endDate);
        newSession.scheduledStartDate = new Date(endDate);
        newSession.scheduledEndDate = new Date(endDate);
        newSession.status = status;
        newSession.courseInstructor = [{
          id: classroom.teachers ,
          name: classroom.teachers,
          email: classroom.teachers
        }];
        newSession.studentList ;
        newSession.status = null; 
        newSession.notice = '';  
        newSession.room = '';  
        newSession.studentList = []; 

        sessionDates.push(newSession);
        endDate.setDate(endDate.getDate() + 7);
      }
      return sessionDates;

    }

  }
}
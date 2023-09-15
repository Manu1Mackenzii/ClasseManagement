import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controllers';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { InstrumentsModule } from 'src/instruments/instruments.module'; 
import { ClassroomsModule } from 'src/classrooms/classrooms.module';


@Module({
  imports: [
    ConfigModule,
   
    MailModule,
    MongooseModule.forFeature([{
      name: Teacher.name,
      schema: TeacherSchema
    }]),
  ],
  providers: [TeachersService],
  exports: [TeachersService],
  controllers: [TeachersController]
})
export class TeachersModule {}

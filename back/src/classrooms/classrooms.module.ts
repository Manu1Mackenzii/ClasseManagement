import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { Classroom, ClassroomSchema } from './schemas/classroom.schema';
import { CourseSessionModule } from 'src/course-sessions/course-session.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    MongooseModule.forFeature([{
      name: Classroom.name,
      schema:ClassroomSchema
    }]),
    CourseSessionModule
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService]
})
export class ClassroomsModule {}

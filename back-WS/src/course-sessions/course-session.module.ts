import { Module } from '@nestjs/common';
import { CourseSessionService } from './course-session.service';
import { CourseSessionController } from './course-session.controller';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSession, CourseSessionSchema } from './schemas/CourseSession.schema';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    MongooseModule.forFeature([{
      name: CourseSession.name,
      schema:CourseSessionSchema
    }]),
  ],
  controllers: [CourseSessionController],
  providers: [CourseSessionService],
  exports: [CourseSessionService]
})
export class CourseSessionModule {}

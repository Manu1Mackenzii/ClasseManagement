import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student , StudentSchema } from './schemas/student.schema';
import { MailModule } from 'src/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';



@Module({

  imports: [
    ConfigModule,
    MailModule,
    MongooseModule.forFeature([{
      name:  Student.name,
      schema: StudentSchema
    }]),
  ],

  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}

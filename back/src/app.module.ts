import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import * as aws from 'aws-sdk';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { SettingsModule } from './settings/settings.module';
import { NotificationModule } from './notification/notification.module';
import { ServiceModule } from './user-services/service.module';
// import { MailModule } from './mail/mail.module';
// import { BullModule } from '@nestjs/bull';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TeachersModule } from './teachers/teachers.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { CourseSessionModule } from './course-sessions/course-session.module';


@Module({
  imports: [
    // ClassroomModule,
    // MongooseModule.forRoot('mongodb://localhost:27017/your-database-name'),
 
    ConfigModule.forRoot({
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService]
    }),
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     redis: {
    //       password: configService.get<string>('REDIS_PASSWORD'),
    //       tls: {
    //         host: configService.get<string>('REDIS_HOST'),
    //         port: configService.get<number>('REDIS_PORT'),
    //       }
    //     },
    //   }),
    //   inject: [ConfigService]
    // }),
    ServiceModule,
    NotificationModule,
    AuthModule,
    UsersModule,
    ImageUploadModule,
    // MailModule,
    SettingsModule,
    StudentsModule,
    TeachersModule,
    ClassroomsModule,
    InstrumentsModule,
    CourseSessionModule,
   
  ],
  controllers: [],
  providers: []
})
export class AppModule {}



/**
 * Configuration de AWS en global sur l'application
 * Update aws config with credentials
 */
aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

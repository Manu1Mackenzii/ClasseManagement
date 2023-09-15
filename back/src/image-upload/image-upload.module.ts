import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from 'src/user-services/service.module';
import { UsersModule } from 'src/users/users.module';
import { ImageUploadController } from './image-upload.controller';
import { ImageUploadService } from './image-upload.service';

@Module({
  imports: [
    ConfigModule,
    ServiceModule,
    UsersModule
  ],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService]
})
export class ImageUploadModule {}

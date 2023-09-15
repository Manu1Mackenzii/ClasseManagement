import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ServiceModule } from 'src/user-services/service.module';

@Module({
  imports: [
    ServiceModule,
    UsersModule,
    MongooseModule.forFeature([{
        name: Notification.name,
        schema: NotificationSchema
    }])
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}

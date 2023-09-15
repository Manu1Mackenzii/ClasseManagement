import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import * as mongoose from "mongoose";
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { SvcService } from 'src/user-services/service.service';

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private readonly svcService: SvcService,
    private readonly userService: UsersService,
    private mailService: MailService,
  ) { }

  async create(notification: CreateNotificationDto) {
    try {
      await this.checkIfElementExist(notification)

      const notificationId = new mongoose.Types.ObjectId();
      const result = await this.notificationModel.create({
        ...notification,
        id: notificationId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      const user = await this.userService.findByUserId(notification.userId);
      const panel = await this.svcService.findOne(notification.panelId);
      const data = await this.findOne(notificationId.toString());

      await this.mailService.sendNotificationEmailQueue(
        user,
        panel,
        data
      )
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    } 
  }

  findAll() {
    return this.notificationModel.find().exec();
  }

  findOne(id: string) {
    return this.notificationModel.findOne({
      id
    }, {_id: 0, __v: 0}).exec();
  }

  findByPanelId(panelId: string) {
    return this.notificationModel.find({
      panelId
    }, {_id: 0, __v: 0}).exec();
  }

  findByUserId(userId: string) {
    return this.notificationModel.find({
      userId
    }, {_id: 0, __v: 0}).exec();
  }

  checkIfPanelHasTrouble(panelId: string) {
    return this.notificationModel.find({
      panelId,
      isResolved: false
    }, {_id: 0, __v: 0}).exec();
  }

  async update(id: string, notification: UpdateNotificationDto) {
   try {
      await this.checkIfElementExist(notification)
      return this.notificationModel.findOneAndUpdate({
        id,
      }, {
        ...notification,
        updatedAt: Date.now()
      }, {
        new: true
      }).exec();
   } catch (error) {
    throw new HttpException(error, HttpStatus.FORBIDDEN);
   }
  }

  async remove(id: string) {
    const post = await this.notificationModel.findOne({id})
    if (!post) {
        throw new NotFoundException({
            message: 'Notification does not exist'
        })
    }
    await this.notificationModel.deleteOne({id}).exec();
  }

  private async checkIfElementExist(notification: CreateNotificationDto |  UpdateNotificationDto) {
    const panel = await this.svcService.findOne(notification.panelId)
    if (!panel) {
        throw new NotFoundException({
            message: 'PanelId not found'
        })
    }
    const user = await this.userService.findByUserId(notification.userId)
    if (!user) {
      throw new NotFoundException({
          message: 'UserId not found'
      })
    }
  }
}

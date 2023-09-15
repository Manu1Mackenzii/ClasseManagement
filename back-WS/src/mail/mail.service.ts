import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { Notification } from 'src/notification/schemas/notification.schema';
import { Service } from 'src/user-services/schemas/service.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class MailService {

    constructor(
         @InjectQueue('mailsend') private mailQueue: Queue,
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}

    async sendUserConfirmation(user: UpdateUserDto, token: string) {
        
        const url = `example.com/auth/confirm?token=${token}`;

        return await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Ilena Pro ! Confirm your Email',
            template: '/confirmation', 
            context: {
                name: user.firstName,
                url,
            },
        });
    }

    async sendCustomerCreation(user: UpdateUserDto, password: string) {
        return await this.mailerService.sendMail({
            to: user.email,
            subject: 'CONFIRMATION DE CRÉATION DE COMPTE INSTALLATEUR',
            template: '/customerCreation', 
            context: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password,
            },
        });
    }

    async sendNotificationEmail(user: UpdateUserDto, panel: Service, notification: Notification, subject = 'No subject') {
        return await this.mailerService.sendMail({
            to: this.configService.get<string>('MAIL_ADMIN_EMAIL'),
            subject: subject,
            template: '/notification', 
            context: {
                user,
                panel,
                notification
            },
        });
    }

    async sendResetPassport(user: CreateUserDto, password: string) {
        return await this.mailerService.sendMail({
            to: user.email,
            subject: 'RÉINITIALISATION DU MOT DE PASSE',
            template: '/resetpassword',
            context: {
                password,
            },
        });
    }

    sendCustomerEmailQueue(user: CreateUserDto): Promise<any> {
        try {
           return this.mailQueue.add('customerAccountCreation', user);
        } catch (err) {
            throw new Error("Error queueing confirmation email to user.");
        }
    }

    sendNotificationEmailQueue(user: UpdateUserDto, service: Service, notification: Notification): Promise<any> {
        try {
           return this.mailQueue.add('notificationEmail', {user, service, notification});
        } catch (err) {
            throw new Error("Error queueing confirmation email to user.");
        }
    }

}

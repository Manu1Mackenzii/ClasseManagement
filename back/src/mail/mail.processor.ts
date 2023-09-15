import {
    OnQueueActive,
    OnQueueCompleted,
    OnQueueFailed,
    Process,
    Processor,
  } from '@nestjs/bull';
  import { Injectable, Logger } from '@nestjs/common';
  import { Job } from 'bull';
  import { MailService } from './mail.service';
  
  @Processor('mailsend')
  @Injectable()
  export class MailProcessor {
    private readonly logger = new Logger(this.constructor.name);
  
    constructor(private readonly mailService: MailService) {}
  
    @OnQueueActive()
    onActive(job: Job) {
      console.log(
        `Processor:@OnQueueActive - Processing job ${job.id} of type ${
          job.name
        }. Data: ${JSON.stringify(job.data)}`,
      );
    }
  
    @OnQueueCompleted()
    onComplete(job: Job) {
      console.log(
        `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
      );
    }
  
    @OnQueueFailed()
    onError(job: Job<any>, error) {
      console.log(
        `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
        error.stack,
      );
    }
  
    @Process('confirmation')
    async sendWelcomeEmail(job: Job): Promise<any> {
      console.log('Processor:@Process - Sending confirmation email.');
      let token = ''
      try {
        const result = await this.mailService.sendUserConfirmation(job.data, token);
        return result;
      } catch (error) {
        this.logger.error('Failed to send confirmation email.', error.stack);
        throw error;
      }
    }

    @Process('customerAccountCreation')
    async sendCustomerWelcomeEmail({data}: Job): Promise<any> {
      console.log('Processor:@Process - Sending confirmation email for customer account creation.');
      try {
        return await this.mailService.sendCustomerCreation(data, data.password);
      } catch (error) {
        this.logger.error('Failed to send confirmation email.', error.stack);
        throw error;
      }
    }

    @Process('notificationEmail')
    async sendNotificationMail({data}: Job): Promise<any> {
      console.log('Processor:@Process - Sending notification email.');
      try {
        return await this.mailService.sendNotificationEmail(data.user, data.panel, data.notification);
      } catch (error) {
        this.logger.error('Failed to send confirmation email.', error.stack);
        throw error;
      }
    }
  }
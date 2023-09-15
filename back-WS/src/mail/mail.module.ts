import { MailerModule } from '@nestjs-modules/mailer'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailProcessor } from './mail.processor';

@Global()
@Module({
    imports: [
      MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            transport: {
                host: config.get('MAIL_HOST'),
                secure: true,
                logger: true,
                auth: {
                  user: config.get('MAIL_USER'),
                  pass: config.get('MAIL_PASSWORD'),
                },
                port: config.get('MAIL_PORT')
            },
            defaults: {
                from: `"No-Reply" <${config.get('MAIL_FROM')}>`,
            },
            template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
            },
          }),
        inject: [ConfigService],
      }),
      BullModule.registerQueue({
        name: 'mailsend',
      }),
    ],
    providers: [
      MailService, 
      ConfigService,
      MailProcessor
    ],
    exports: [MailService],
})
export class MailModule {}
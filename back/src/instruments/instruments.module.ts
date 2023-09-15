import { Module } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { InstrumentsController } from './instruments.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { Instrument, InstrumentSchema } from './schemas/instrument.schemas';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    MongooseModule.forFeature([{
      name: Instrument.name,
      schema:InstrumentSchema
    }]),
  ],
  controllers: [InstrumentsController],
  providers: [InstrumentsService],
  exports: [InstrumentsService]
})
export class InstrumentsModule {}

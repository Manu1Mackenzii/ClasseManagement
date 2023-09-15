import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Settings, SettingsSchema } from './schemas/settings.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}

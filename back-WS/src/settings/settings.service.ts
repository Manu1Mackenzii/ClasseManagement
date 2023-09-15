import { Settings, SettingsDocument } from './schemas/settings.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SettingsService {

  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
    ) { }

  findAll() {
    return this.settingsModel.findOne().exec();
  }
}

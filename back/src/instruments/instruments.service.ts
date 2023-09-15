import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument, InstrumentDocument } from './schemas/instrument.schemas';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InstrumentsService {

  constructor(
    @InjectModel(Instrument.name) private instrumentModel: Model<InstrumentDocument>,
    // private svcService: SvcService
    ) { }

  async create(createInstrumentDto: CreateInstrumentDto) : Promise<Instrument | any > {
 
    let classFound = await this.instrumentModel.findOne({ label: createInstrumentDto.label }).exec();

    if (classFound) {
        throw new UnauthorizedException({
            message: 'Instrument already exists with same name'
        });
    } else {
    const createdInstrument = new this.instrumentModel({
      ...createInstrumentDto,
      id: new mongoose.Types.ObjectId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    return createdInstrument.save();
  }
}

  async findAll() : Promise<Instrument[]> {
    return await this.instrumentModel.find().exec();
}

  findOne(id:string): Promise<Instrument > {
    return this.instrumentModel.findOne({ id }, {id: 0, __v: 0}).exec();
  }

  async update(id: string, updateInstrumentDto: UpdateInstrumentDto) : Promise<Instrument> {
    const instrument = await this.instrumentModel.findOne({ id }).exec();
    if(updateInstrumentDto.label && updateInstrumentDto.label !== instrument.label) {
        let instrumentFound = await this.instrumentModel.findOne({ label: updateInstrumentDto.label });
        if (instrumentFound && instrumentFound.id !== id) {
            throw new UnauthorizedException({
                message: 'Instruments already exists '
            });
        }
    }
    return this.instrumentModel.findOneAndUpdate({ id }, {
        ...updateInstrumentDto,
        // id : new mongoose.Types.ObjectId(),
        updatedAt: Date.now()
    }, {
        new: true
    }).exec();
  }

  async remove(id: string) {
    const instrument = await this.instrumentModel.findOne({id: id})
    if (!instrument) {
        throw new NotFoundException({
            message: 'Instrument does not exist'
        })
    }
    await this.instrumentModel.deleteOne({id: id}).exec();
    // await this.svcService.removeAllByUser(id)
}
}

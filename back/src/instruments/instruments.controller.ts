import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { ConfigService } from '@nestjs/config';

@Controller('instruments')
export class InstrumentsController {
  constructor(
    private readonly instrumentsService: InstrumentsService,
    private configService: ConfigService

  ) { }

  @Post()
  async create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return await this.instrumentsService.create(createInstrumentDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.instrumentsService.findAll();
  }

  @Get('version')
  async getVersion(@Request() req) {
    return this.configService.get<string>('VERSION');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.instrumentsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentsService.update(id, updateInstrumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instrumentsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Put, Param, Delete, Request} from '@nestjs/common';
import { CourseSessionService } from './course-session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ConfigService } from '@nestjs/config';

@Controller('sessions')
export class CourseSessionController {
  constructor(
    private readonly sessionsService: CourseSessionService,
    private configService: ConfigService
    ) { }

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return await this.sessionsService.create(createSessionDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.sessionsService.findAll();
  }

  @Get(':id')
  async findById (@Param('id') id: string) {
    return this.sessionsService.findById(id);
  }

  @Get('version')
  async getVersion(@Request() req){
    return this.configService.get<string>('VERSION');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return  await this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ConfigService } from '@nestjs/config';
import { CourseSessionService } from 'src/course-sessions/course-session.service';


@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
    private readonly courseSessionService: CourseSessionService,
    private configService: ConfigService
  ) { }

  @Post()
  async create(@Body() createClassroomDto: CreateClassroomDto) {
    return await this.classroomsService.create(createClassroomDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.classroomsService.findAll();
  }

  @Get('version')
  async getVersion(@Request() req) {
    return this.configService.get<string>('VERSION');
  }

  @Get(':id')
  async findByClassroomId(@Param('id') id: string) {
    return await this.classroomsService.findByClassroomId(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return await this.classroomsService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomsService.remove(id);
  }

  @Get(':id/course-sessions')
  async generateSessions(@Param('id') classroomId: string) {
    const classroom = await this.classroomsService.findByClassroomId(classroomId);
    return await this.courseSessionService.generateSessions(classroomId, classroom);
  }

}

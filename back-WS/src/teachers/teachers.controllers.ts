import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TeachersService } from './teachers.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';



@Controller('teachers')
export class TeachersController {
    constructor(
      private readonly teachersService: TeachersService,
      private configService: ConfigService
      ) {}
      @Post()
      async create(@Body() createTeacherDto: CreateTeacherDto) {
       return await this.teachersService.createTeacher(createTeacherDto);
      }

    @Get()
    async findAll(@Request() req) {
      return await this.teachersService.findAll();
    }


    @Get('version')
    async getVersion(@Request() req) {
      return this.configService.get<string>('VERSION');
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.teachersService.findByTeacherId(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string, 
      @Body() updateTeacherDto: UpdateTeacherDto
      ) {
      return await this.teachersService.update(id, updateTeacherDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
     return this.teachersService.remove(id);
    }
}

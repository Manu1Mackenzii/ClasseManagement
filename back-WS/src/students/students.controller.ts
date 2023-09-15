import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ConfigService } from '@nestjs/config';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService,
    private configService: ConfigService
    ) {}
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
     return await this.studentsService.createStudent(createStudentDto);
    }
  
  @Get()
    async findAll() {
      return await this.studentsService.findAll();
    }

  @Get('version')
    async getVersion() {
      return this.configService.get<string>('VERSION');
    }

  @Get(':id')
   async findOne(@Param('id') id: string) {
      return await this.studentsService.findByStudentId(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateStudentDto: UpdateStudentDto
    ) {
    return await this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);

  
  }
}

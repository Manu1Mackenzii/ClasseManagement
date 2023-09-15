import { Body, Controller, Delete, Get, Param, Put, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
      private readonly userService: UsersService,
      private configService: ConfigService
      ) {}
  
    @Get()
    async findAll(@Request() req) {
      return await this.userService.findAll();
    }


    @Get('version')
    async getVersion(@Request() req) {
      return this.configService.get<string>('VERSION');
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.userService.findByUserId(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string, 
      @Body() updateUserDto: UpdateUserDto
      ) {
      return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
     return this.userService.remove(id);
    }
}

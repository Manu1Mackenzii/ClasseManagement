import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }

  @Get()
  async findAll() {
    return await this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notificationService.findOne(id);
  }

  @Get('panel/:id')
  async findByPanelId(@Param('id') panelId: string) {
    return await this.notificationService.findByPanelId(panelId);
  }

  @Get('panel/:id/unresolved')
  async findNotificationUnresoledByPanelId(@Param('id') panelId: string) {
    return await this.notificationService.checkIfPanelHasTrouble(panelId);
  }

  @Get('user/:id')
  async findByUserId(@Param('id') userId: string) {
    return await this.notificationService.findByUserId(userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return await this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notificationService.remove(id);
  }
}

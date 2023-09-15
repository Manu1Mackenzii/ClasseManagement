import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/create-category.dto';
import { ServiceDto } from './dto/create-service.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SvcService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(
    private readonly svcService: SvcService,
    private readonly categoryService: CategoryService,
  ) { }

  /**
   * Categories API
   */

  @UseGuards(JwtAuthGuard)
  @Get('/categories')
  async findAllCategories(@Request() req) {
    const parentCode = req.body.parentCode ?? null;
    return this.categoryService.findAll(parentCode);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/categories/:id')
  async getCategoryInfo(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/categories')
  async createCatgeory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    let res = await this.categoryService.update(id, updateCategoryDto);
    if (!res) {
      return {
        success: false,
        message: 'Category update failed. Category not exists or you have not the permissions'
      }
    }
    return res;
  }


  /**
   * ***********************************
   * Services API **********************
   * ***********************************
   */

  
  /** 
   * @param serviceDto 
   * @returns 
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() serviceDto: ServiceDto) {
    return this.svcService.create(serviceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.svcService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async findAllByUser(@Request() req) {
    return this.svcService.findAll(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/search')
  // async searchByCoordinate(@Body() search: SearchPanelDto) {
  //   try {
  //     return await this.svcService.findByLocation(search);
  //   } catch (error) {
  //     return new ForbiddenException(error)
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.svcService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    let res = await this.svcService.update(id, updateServiceDto);
    if (!res) {
      return {
        success: false,
        message: 'Service update failed. Service not exists or you have not the permissions'
      }
    }
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') serviceId: string) {
    return this.svcService.remove(serviceId);
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';


@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }

  findAll(parentCode: string = null): Promise<Category[]> {
    let conditions = {};
    if (parentCode) {
      conditions['parentCode'] = parentCode;
    }
    return this.categoryModel.find(conditions).exec();
  }

  findOne(id: string): Promise<Category | undefined> {
    return this.categoryModel.findOne({ id }, { __v: 0 }).exec();
  }

  create(categoryDto: CategoryDto) {
    try {
      return this.categoryModel.create({
        ...categoryDto
      })
    } catch (error) {
      return {
        success: false,
        error: error
      };
    }
  }

  update(id: string, category: UpdateCategoryDto) {
    return this.categoryModel.findOneAndUpdate({
      _id: id,
    }, {
      ...category,
      updatedAt: Date.now()
    }, {
      new: true
    }).exec();
  }

  async remove(id: string) {
    const service = await this.categoryModel.findOne({ id })
    if (!service) {
      throw new NotFoundException({
        message: 'Category does not exist'
      })
    }
    await this.categoryModel.deleteOne({ id }).exec();
  }

  async removeAllByParent(parentCode: string) {
    if (!this.categoryModel.findOne({ parentCode: parentCode })) {
      throw new NotFoundException({
        message: 'Parent category not exist'
      })
    }
    await this.categoryModel.deleteMany({ parentCode: parentCode }).exec();
  }
}
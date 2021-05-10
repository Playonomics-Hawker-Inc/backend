import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './types/category';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  /**
   * Create a new category
   * @param dto
   * @returns
   */
  async createCategory(dto: CategoryDto): Promise<Category> {
    return await new this.categoryModel(dto).save();
  }

  /**
   *
   * @returns
   */
  async getAllCategories() {
    const result = await this.categoryModel.find();

    return result as Category[];
  }

  async findByCategoryId(id: string): Promise<Category> {
    return await this.categoryModel.findOne({ categoryId: id });
  }

  /**
   * Edit category
   * @param id
   * @param dto
   * @returns
   */
  async editCategory(dto: CategoryDto): Promise<Category> {
    const category = await this.categoryModel.findById(dto._id);
    await category.updateOne(dto);
    return await this.categoryModel.findById(dto._id);
  }

  /**
   * Delete category
   * @param id
   */
  async deleteCategory(id: string) {
    // await this.categoryModel.deleteOne({ _id: id }).exec();

    const category = await this.categoryModel.findById(id.toString());
    if (category) {
      await category.deleteOne();
    } else {
      throw new HttpException('Category Not found', HttpStatus.NOT_FOUND);
    }
  }
}

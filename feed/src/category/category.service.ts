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
  async getAllCategories(query: any) {
    return await this.getPaginatedResponse({}, query);
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

  /**
   * Autocomplete search
   * @param query
   * @returns
   */
  async searchCategoryByNameAutoComplete(query: String): Promise<Category[]> {
    return await this.categoryModel.aggregate([
      {
        $search: {
          autocomplete: {
            path: 'name',
            query: query,
          },
        },
      },

      { $limit: 5 },
      {
        $project: {
          name: 1,
          slug: 1,
        },
      },
    ]);
  }
  /**
   * Pagination
   * @param matchQuery
   * @param query
   * @returns
   */
  private async getPaginatedResponse(
    matchQuery: any,
    query: any,
  ): Promise<Category[]> {
    // Copy req.query
    const reqQuery = { ...query };
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`,
    );

    const pagination = {};
    let total = await this.categoryModel.find(matchQuery).countDocuments();

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || total;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < total) {
      pagination['next'] = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination['prev'] = {
        page: page - 1,
        limit,
      };
    }
    pagination['pageCount'] = Math.ceil(total / limit);

    const result = await this.categoryModel.aggregate([
      { $match: matchQuery },

      {
        $project: {
          name: 1,
          description: 1,
          slug: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
          categories: [{ $skip: startIndex }, { $limit: limit }], // add projection here wish you re-shape the docs
        },
      },
    ]);

    return result[0];
  }
}

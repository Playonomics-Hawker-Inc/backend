import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Experience } from '../experience/types/experience';
import { Category } from '../category/types/category';
@Injectable()
export class CatalogService {
  constructor(
    @InjectModel('Experience')
    private readonly experiencesModel: Model<Experience>,
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async getAll(query: any) {
    const result = await this.getPaginatedResponse({}, query);
    return result;
  }

  private async getPaginatedResponse(
    matchQuery: any,
    query: any,
  ): Promise<Experience[]> {
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
    let total = await this.experiencesModel.find(matchQuery).countDocuments();

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

    const result = await this.experiencesModel.aggregate([
      { $match: matchQuery },

      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          status: 1,
          slug: 1,
          images: 1,
          theme: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
          experiences: [{ $skip: startIndex }, { $limit: limit }], // add projection here wish you re-shape the docs
        },
      },
    ]);

    return result[0];
  }
}

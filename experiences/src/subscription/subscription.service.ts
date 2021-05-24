import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subscription } from './types/subscription';
import { SubscriptionDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel('Subscription')
    private subscriptionModel: Model<Subscription>,
  ) {}

  /**
   * Create a new subscription
   * @param dto
   * @returns
   */
  async createSubscription(dto: SubscriptionDto): Promise<Subscription> {
    return await new this.subscriptionModel(dto).save();
  }

  async getAll(query: any) {
    const result = await this.getPaginatedResponse({}, query);
    return result;
  }

  private async getPaginatedResponse(
    matchQuery: any,
    query: any,
  ): Promise<Subscription[]> {
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
    let total = await this.subscriptionModel.find(matchQuery).countDocuments();

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

    const result = await this.subscriptionModel.aggregate([
      { $match: matchQuery },

      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          location: 1,
          price: 1,
          createdDated: 1,
          subscriptionStatus: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
          subscriptions: [{ $skip: startIndex }, { $limit: limit }], // add projection here wish you re-shape the docs
        },
      },
    ]);

    return result[0];
  }
}

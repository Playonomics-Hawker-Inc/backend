import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/types/user';
import { LoginDTO, RegisterDTO } from '../auth/dto/auth.dto';

import * as bcrypt from 'bcryptjs';
import { Payload } from '../user/types/payload';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async findByPayload(payload: Payload) {
    const { id } = payload;
    return await this.userModel.findOne({ _id: id });
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async getUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
 /**
   *
   * Authenticate user
   * @param userDTO
   */
  async login(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
    /**
   * Note - delete does not work
   * @param user Remove password
   */
     async sanitizeUser(user: User) {
      let sanitized = user;
      delete sanitized['password'];
  
      return sanitized;
    }
  async getUserById(userId: string) {
    let user = await this.getUser(userId);

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
      address: user.address,
      phone: user.phone,
      created: user.created,
      authorities: user.authorities,
    };
  }

  /**
   * List users
   * @param query
   * @returns
   */
  async getAll(query: any) {
    const result = await this.getPaginatedResponse({}, query);
    return result;
  }

  /**
   * Paginate
   * @param matchQuery
   * @param query
   * @returns
   */
  private async getPaginatedResponse(
    matchQuery: any,
    query: any,
  ): Promise<User[]> {
    // Copy req.query
    const reqQuery = { ...query };
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    const pagination = {};
    let total = await this.userModel.find(matchQuery).countDocuments();

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
    // pagination['total'] = total;
    pagination['pageCount'] = Math.ceil(total / limit);

    const result = await this.userModel.aggregate([
      { $match: matchQuery },

      {
        $project: {
          firstName: 1,
          lastName: 1,
          admin: 1,
          authorities: 1,
          email: 1,
          phone: 1,
          created: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
          users: [{ $skip: startIndex }, { $limit: limit }], // add projection here wish you re-shape the docs
        },
      },
    ]);

    return result[0];
  }
}

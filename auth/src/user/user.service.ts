import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../auth/dto/auth-dto';
import { User } from './types/user';
import * as bcrypt from 'bcryptjs';
import { Payload } from './types/payload';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userDTO: RegisterDTO) {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  /**
   *
   * @param id
   * @param dto
   */

  // TODO sheduling service is working properly but need to check for the implementation
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async endMonthlySubscription(id: string, dto: RegisterDTO): Promise<User> {
  //   const { subscriptionStatus } = dto;
  //   console.log('see dto', dto, subscriptionStatus);
  //   dto.subscriptionStatus = 'INACTIVE';
  //   const user = await this.userModel.findOne({ _id: id });
  //   await user.updateOne(dto);
  //   return await await this.userModel.findOne({ _id: id });
  // }

  async findUserByType(type: string, query: any) {
    return await this.getPaginatedResponse({ type: type.toUpperCase() }, query);
  }

  /**
   *
   * @param email
   * @returns
   */
  async findOne(email: string) {
    const user = await this.userModel.findOne({ email }).select('-password');
    if (user) {
      return await this.sanitizeUser(user);
    }
    return { message: 'User Not Found!' };
  }

  /**
   *
   * @param userDTO
   * @returns
   */
  async updateOne(userDTO: RegisterDTO) {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email }).select('-_id');

    if (user) {
      await user.updateOne(userDTO);
    }

    return await this.userModel.findOne({ email }).select('-password');
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

  async findByPayload(payload: Payload) {
    const { id } = payload;
    return await this.userModel.findOne({ _id: id });
  }

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
    pagination['total'] = total;
    pagination['pageCount'] = Math.ceil(total / limit);

    const result = await this.userModel.aggregate([
      { $match: matchQuery },

      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          address: 1,
          type: 1,
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

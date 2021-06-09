import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './types/user';
import * as bcrypt from 'bcryptjs';
import { Payload } from './types/payload';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

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
}

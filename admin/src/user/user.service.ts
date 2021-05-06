import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/types/user';
import * as bcrypt from 'bcryptjs';
import { Payload } from '../user/types/payload';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async findByPayload(payload: Payload) {
    const { id } = payload;
    return await this.userModel.findOne({ _id: id });
  }
}

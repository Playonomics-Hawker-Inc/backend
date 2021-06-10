import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from '../common/types/payload';
import { UserService } from '../common/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signPayload(payload: string | Buffer | object) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return {
      _id: '609d803c132965c674526718',
      email: 'pladmin@gmail.com',
      role: ['USER'],
    };
    // return await this.userService.findByPayload(payload);
  }
}

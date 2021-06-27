import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from '../user/types/payload';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signPayload(payload: string | Buffer | object) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}

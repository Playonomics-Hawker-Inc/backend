import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterDTO } from '../auth/dto/auth-dto';

import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './types/user';

@Controller('user/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    return { user };
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDTO, RegisterDTO } from './dto/auth-dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User as UserDocument } from '../user/types/user';
import { User } from '../user/user.decorator';
import { SessionService } from '../session/session.service';

@Controller('v1')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  /**
   *
   * @param userDTO
   */
  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const token = await this.authService.signPayload({ id: user._id });
    await this.authService.signPayload({ id: user._id });
    await this.sessionService.createSession(token);
    return { token };
  }

  /**
   *
   * @param userDTO
   */
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.login(userDTO);
    const token = await this.authService.signPayload({ id: user._id });
    await this.sessionService.createSession(token);
    return { token };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@User() user): Promise<UserDocument> {
    return user;
  }
}

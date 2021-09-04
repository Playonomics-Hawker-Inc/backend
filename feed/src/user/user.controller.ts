import {
  Controller,
  UseGuards,
  Get,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(@Query() query) {
    return await this.userService.getAll(query);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return 'delete success';
  }
}

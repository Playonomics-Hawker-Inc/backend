import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { CartDto } from './dto/cart.dto';
import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';

import { CartService } from './cart.service';
import { Cart } from './types/cart';

@UseGuards(AuthGuard)
@Controller('v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() dto: CartDto, @User() user) {
    return this.cartService.addToCart(dto, user.userId);
  }

  @Post('remove')
  removeFromCart(@Body() dto: CartDto, @User() user) {
    return this.cartService.removeFromCart(dto, user.userId);
  }
}

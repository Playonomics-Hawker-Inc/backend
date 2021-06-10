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

@Controller('v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  addToCart(@Body() dto: CartDto, @User() user) {
    // console.log('dto', dto);
    return this.cartService.addToCart(dto, user._id);
  }
}

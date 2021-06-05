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
  import { CartService } from './cart.service';
  import { Cart } from './types/cart';
//   import { AuthGuard } from '../auth/guards/';

@Controller('v1/cart')

export class CartController {
    constructor(private readonly cartService: CartService) {}
    @Get()
    // @UseGuards(AuthGuard)
    async getUserCart(@User() user): Promise<Cart> {
      return await this.cartService.getUserCart(user._id);
    }
    @Post('add')
  addToCart(@Body() dto: CartDto, @User() user) {
    return this.cartService.addToCart(dto, user._id);
  }
  @Put('update')
  updateCart(@Body() dto: CartDto, @User() user) {
    return this.cartService.updateCart(dto, user._id);
  }
  @Post('remove')
  removeFromCart(@Body() dto: CartDto, @User() user) {
    return this.cartService.removeFromCart(dto, user._id);
  }
  @Post('quantity')
  updateQuantity(@Body() dto: CartDto, @User() user) {
    return this.cartService.updateQuantity(dto, user._id);
  }
}
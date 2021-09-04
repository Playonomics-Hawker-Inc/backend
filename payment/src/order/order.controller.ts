import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    Delete,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { OrderService } from './order.service';
import { Order } from './types/order';
import { OrderDto } from './dto/order.dto';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: OrderDto): Promise<Order> {
    return await this.orderService.createOrder(dto);
  }
}

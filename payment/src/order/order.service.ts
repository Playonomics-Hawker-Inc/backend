import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './types/order';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
  ) {}
 /**
   * Create a new order
   * @param dto
   * @returns
   */
  async createOrder(dto: OrderDto): Promise<Order> {
    return await new this.orderModel(dto).save();
  }
}
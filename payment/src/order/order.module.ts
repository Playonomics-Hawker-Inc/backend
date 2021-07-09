import { HttpModule, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';


@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Order', schema: OrderSchema }],
      
    ),
    HttpModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

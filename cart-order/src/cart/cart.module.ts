import { HttpModule, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from './schemas/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { ExperienceSchema } from '../common/schemas/experience.schema';
import { UserSchema } from '../common/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cart', schema: CartSchema },
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'User', schema: UserSchema },
    ]),
    HttpModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

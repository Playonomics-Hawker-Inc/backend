import { HttpModule, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from './schemas/cart.schema';
import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { AuthService } from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';

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
  exports: [CartService],
})
export class CartModule {}

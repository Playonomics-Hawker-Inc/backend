import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSchema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
  ],
controllers:[AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}

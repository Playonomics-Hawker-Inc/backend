import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from '../session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }], 'auth'),
    HttpModule,
  ],
  providers: [UserService, SessionService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

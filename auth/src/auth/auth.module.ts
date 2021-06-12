import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionService } from '../session/session.service';

import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../jwt.strategy';
import { HttpModule } from '../common/http/http.module';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SessionService],
})
export class AuthModule {}

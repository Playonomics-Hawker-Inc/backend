import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { HttpModule } from '../common/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

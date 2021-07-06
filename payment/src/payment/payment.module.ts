import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { HttpModule } from '../common/http/http.module';
import { PaymentController } from './payment.controller';

@Module({
  imports: [HttpModule],
  providers: [PaymentService],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

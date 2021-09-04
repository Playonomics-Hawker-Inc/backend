import { HttpModule, Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseSchema } from './schemas/purchase.schema';


@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Purchase', schema: PurchaseSchema }],
      
    ),
    HttpModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}

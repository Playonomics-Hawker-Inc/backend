import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    Delete,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { PurchaseService } from './purchase.service';
  import { Purchase } from './types/purchase';
  import { PurchaseDto } from './dto/purchase.dto';

  @Controller('v1/purchase')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @Post()
    async createPurchase(@Body() dto: PurchaseDto): Promise<Purchase> {
      return await this.purchaseService.createPurchase(dto);
    }
}
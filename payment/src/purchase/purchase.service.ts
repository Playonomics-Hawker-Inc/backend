import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PurchaseDto} from "./dto/purchase.dto";
import {Purchase} from "./types/purchase";

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel('Purchase') private purchaseModel: Model<Purchase>,
    
  ) {}
 /**
   * Create a new purchase
   * @param dto
   * @returns
   */
  async createPurchase(dto: PurchaseDto): Promise<Purchase> {
    return await new this.purchaseModel(dto).save();
  }
}
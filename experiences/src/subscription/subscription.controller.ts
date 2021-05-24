import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './types/subscription';
import { SubscriptionDto } from './dto/subscription.dto';

@Controller('v1/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
    @Body() dto: SubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.createSubscription(dto);
  }

  @Get()
  async getAll(@Query() query) {
    return await this.subscriptionService.getAll(query);
  }
}

import { SubscriptionService } from './subscription.service';
import { Subscription } from './types/subscription';
import { SubscriptionDto } from './dto/subscription.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createSubscription(dto: SubscriptionDto): Promise<Subscription>;
    getAll(query: any): Promise<Subscription[]>;
}

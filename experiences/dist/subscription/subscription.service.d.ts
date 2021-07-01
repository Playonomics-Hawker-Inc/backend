import { Model } from 'mongoose';
import { Subscription } from './types/subscription';
import { SubscriptionDto } from './dto/subscription.dto';
export declare class SubscriptionService {
    private subscriptionModel;
    constructor(subscriptionModel: Model<Subscription>);
    createSubscription(dto: SubscriptionDto): Promise<Subscription>;
    getAll(query: any): Promise<Subscription[]>;
    private getPaginatedResponse;
}

import { Document } from 'mongoose';

export interface Order extends Document {
    id: string;
    payment_id: string;
    razorpay_order_id: string;
    amount: string;
    email: string; 
    contact: string; 

}

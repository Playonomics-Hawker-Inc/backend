import { Document } from 'mongoose';
export interface Subscription extends Document {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    price: string;
    cardDetails: {
        cardNumber: number;
        cardHolderName: string;
        cvv: string;
        expDate: string;
    };
}

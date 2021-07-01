export declare class SubscriptionDto {
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

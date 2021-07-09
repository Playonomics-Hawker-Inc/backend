import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required: [true, 'payment id is required'],
    },
    razorpay_order_id:{
        type: String,
        required: [true, 'order id is required'],
    },
    amount:{
        type: String,
        required: [true, 'amount is required'],
    },
    email:{
        type: String,       
    },
    contact:{
        type: String,      
    },
    createdDated: { type: Date, default: Date.now },
});
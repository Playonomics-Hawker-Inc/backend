import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required'],
    maxlength: 32,
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  subscriptionType: {
    type: String,
    enum: ['free', 'monthly', 'annual'],
    default: 'free',
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is Required'],
  },
  location: String,
  price: String,
  cardDetails: {
    cardNumber: {
      type: Number,
      required: [true, 'Card number is Required'],
      maxlength: 16,
      trim: true,
    },
    cardHolderName: {
      type: String,
      required: [true, 'Card holder Name is Required'],
    },
    cvv: {
      type: String,
      required: [true, 'CVV is Required'],
    },
    expDate: {
      type: String,
      required: [true, 'Expire date is Required'],
    },
  },
  createdDated: { type: Date, default: Date.now },
});

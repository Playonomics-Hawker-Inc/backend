import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  lastName: {
    type: String,
    trim: true,
    required: false,
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  authorities: {
    type: [String],
    required: true,
    enum: ['USER', 'ADMIN'],
    default: ['USER'],
  },

  subscriptionStatus: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: ['INACTIVE'],
  },
  PaymentStatus: {
    type: String,
    enum: ['SUCCESS', 'PENDING', 'FAILED', 'OPEN'],
    default: ['OPEN'],
  },

  subscription: {
    type: Object,
    subscriptionType: {
      type: String,
      enum: ['BASIC', 'MONTHLY', 'ANNUALLY'],
      default: ['BASIC'],
    },
    required: true,
    subscriptionStartDate: String,
    subscriptionEndDate: String,
  },

  phone: {
    type: String,
  },
  created: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

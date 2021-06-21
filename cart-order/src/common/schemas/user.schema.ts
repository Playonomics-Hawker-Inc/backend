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

  created: { type: Date, default: Date.now },
});

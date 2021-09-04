import * as mongoose from 'mongoose';
import { ExperienceSchema } from '../../experience/schemas/experience.schema';
import { UserSchema } from '../../user/schemas/user.schema';

export const CartSchema = new mongoose.Schema({
  experiences: [ExperienceSchema],
  user: UserSchema,
});

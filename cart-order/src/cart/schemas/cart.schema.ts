import * as mongoose from 'mongoose';
import { ExperienceSchema } from '../../common/schemas/experience.schema';
import { UserSchema } from '../../common/schemas/user.schema';

export const CartSchema = new mongoose.Schema({
  experiences: [ExperienceSchema],
  user: UserSchema,
});

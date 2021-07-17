import * as mongoose from 'mongoose';
import { ExperienceSchema } from '../../common/schemas/experience.schema';


export const PurchaseSchema = new mongoose.Schema({
  experiences: [ExperienceSchema],
  user: {type:String},
  order_id:{type:String},
  createdDated: { type: Date, default: Date.now },
});

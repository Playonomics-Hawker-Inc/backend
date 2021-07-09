import { Document } from 'mongoose';

export class Purchase extends Document {
  experiences: any[];
  user:string;
  order_id:string;
}

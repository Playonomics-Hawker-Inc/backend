import { Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  admin: boolean;
  email: string;
  type: string;
  authorities: [string];
  address: string;
  phone: string;
  created: Date;
}

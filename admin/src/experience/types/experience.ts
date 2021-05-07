import { Document } from 'mongoose';

export interface Experience extends Document {
  id: string;
  title: string;
  description: string;
  price: any;
  status: string;
  slug: string;

  images: any[];
}

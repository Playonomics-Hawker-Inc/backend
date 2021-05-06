import { Document } from 'mongoose';

export interface Experience extends Document {
  id: string;
  title: string;
  description: string;
  currency: string;
  status: string;
  slug: string;

  images: any[];
}

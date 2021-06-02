import { Document } from 'mongoose';

export interface Category extends Document {
    id: string;
    name: string;
    description: string;
    status: string;
    slug: string; 
}

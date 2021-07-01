import { Document } from 'mongoose';
export interface Template extends Document {
    id: string;
    title: string;
    components: [Component];
    experience: string;
}
export interface Component extends Document {
    id: string;
    index: number;
    attributesMap: Map<string, string>;
    type: string;
}

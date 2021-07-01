import { Model } from 'mongoose';
import { Experience } from './types/experience';
import { Category } from './types/category';
export declare class CatalogService {
    private readonly experiencesModel;
    private categoryModel;
    constructor(experiencesModel: Model<Experience>, categoryModel: Model<Category>);
    getAll(query: any): Promise<Experience[]>;
    private getPaginatedResponse;
}

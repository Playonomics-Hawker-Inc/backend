import { Model } from 'mongoose';
import { Category } from './types/category';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    createCategory(dto: CategoryDto): Promise<Category>;
    getAllCategories(query: any): Promise<Category[]>;
    findByCategoryId(id: string): Promise<Category>;
    editCategory(dto: CategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
    searchCategoryByNameAutoComplete(query: String): Promise<Category[]>;
    private getPaginatedResponse;
}

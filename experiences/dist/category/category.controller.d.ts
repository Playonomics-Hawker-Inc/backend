import { CategoryService } from './category.service';
import { Category } from './types/category';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(dto: CategoryDto): Promise<Category>;
    getAll(query: any): Promise<Category[]>;
    editCategory(dto: CategoryDto): Promise<Category>;
    removeCategory(id: string): Promise<string>;
    searchDepartmentByNameAutoComplete(query: any): Promise<Category[]>;
}

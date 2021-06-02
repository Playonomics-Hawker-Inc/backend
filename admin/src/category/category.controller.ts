import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './types/category';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() dto: CategoryDto): Promise<Category> {
    return await this.categoryService.createCategory(dto);
  }

  @Get()
  async getAll(@Query() query) {
    return await this.categoryService.getAllCategories(query);
  }

  /**
   * Edit category
   * @param dto
   * @returns
   */

  @Put()
  async editCategory(@Body() dto: CategoryDto): Promise<Category> {
    return await this.categoryService.editCategory(dto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
    return 'success';
  }

  /**
   *
   * @param query
   * @returns
   */
  @Get('autocomplete')
  async searchDepartmentByNameAutoComplete(
    @Query('query') query,
  ): Promise<Category[]> {
    const departments = await this.categoryService.searchCategoryByNameAutoComplete(
      query,
    );
    return departments;
  }
}

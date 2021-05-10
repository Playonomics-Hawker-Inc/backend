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
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
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

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
    return 'success';
  }
}

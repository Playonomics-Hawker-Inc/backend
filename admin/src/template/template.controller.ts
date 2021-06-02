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
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';

import { TemplateService } from './template.service';
import { TemplateDto } from './dto/template.dto';
import { Template } from './types/template';

@Controller('v1/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async createCategory(@Body() dto: TemplateDto): Promise<Template> {
    return await this.templateService.createTemplate(dto);
  }

  @Get('details')
  async getTemplate(
    @Query('slug') slug,
    @Query('title') title,
  ): Promise<Template> {
    return await this.templateService.getTemplate(slug, title);
  }

  /**
   * Get templates for an experience slug
   * @param slug
   * @returns
   */
  @Get(':slug')
  async getTemplates(@Param('slug') slug: string): Promise<Template[]> {
    return await this.templateService.getTemplates(slug);
  }
}

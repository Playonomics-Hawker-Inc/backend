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
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

import { TemplateService } from './template.service';
import { TemplateDto } from './dto/template.dto';
import { Template } from './types/template';

@UseGuards(AuthGuard, AdminGuard)
@Controller('v1/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async createCategory(@Body() dto: TemplateDto): Promise<Template> {
    return await this.templateService.createTemplate(dto);
  }

  @Put()
  async editTemplate(@Body() dto: TemplateDto) {
    return await this.templateService.editTemplate(dto);
  }

  @Post('/activate')
  async setAsDefault(@Body() dto: TemplateDto) {
    return await this.templateService.setAsDefault(dto);
  }

  @Get('details')
  async getTemplate(
    @Query('slug') slug,
    @Query('title') title,
  ): Promise<Template> {
    return await this.templateService.getTemplate(slug, title);
  }

  @Get('titles/:slug')
  async getAvailableTitles(@Param('slug') slug: string) {
    return await this.templateService.getAvailableTitles(slug);
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

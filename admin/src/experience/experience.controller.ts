import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { TemplateService } from '../template/template.service';

import { ExperienceDto } from '../experience/dto/experience.dto';
import { Experience } from '../experience/types/experience';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AuthGuard, AdminGuard)
@Controller('v1/experience')
export class ExperienceController {
  constructor(
    private readonly experiencesService: ExperienceService,
    private readonly templateService: TemplateService,
  ) {}

  @Get()
  async getAll(@Query() query) {
    return await this.experiencesService.getAll(query);
  }

  @Post()
  async createExperience(@Body() dto: ExperienceDto): Promise<Experience> {
    const experience = await this.experiencesService.createExperience(dto);
    await this.templateService.createDefaultTemplate(dto, experience.slug);
    return experience;
  }

  /**
   *
   * @param dto
   * @returns
   */
  @Put()
  async updateExperience(@Body() dto: ExperienceDto): Promise<Experience> {
    return await this.experiencesService.updateExperience(dto);
  }

  /**
   *
   * @param query
   * @returns
   */
  @Get('autocomplete')
  async searchExperienceByTitleAutoComplete(
    @Query('query') query,
  ): Promise<Experience[]> {
    const experiences = await this.experiencesService.searchExperienceByTitleAutoComplete(
      query,
    );
    return experiences;
  }

  /**
   * Note : The ordering is different as nestjs search autocomplete won't work if this comes before that
   * @param slug
   * @returns
   */
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return await this.experiencesService.findOne(slug);
  }
}

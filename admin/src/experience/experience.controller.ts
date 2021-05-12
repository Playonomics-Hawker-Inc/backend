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
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceDto } from '../experience/dto/experience.dto';
import { Experience } from '../experience/types/experience';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('v1/experience')
export class ExperienceController {
  constructor(private readonly experiencesService: ExperienceService) {}

  @Get()
  async getAll(@Query() query) {
    return await this.experiencesService.getAll(query);
  }

  @Post()
  async createExperience(@Body() dto: ExperienceDto): Promise<Experience> {
    return await this.experiencesService.createExperience(dto);
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
   * Note : The ordering is different as nestjs search autocomplete won't work is this comes before that
   * @param slug
   * @returns
   */
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    console.log('Got slug', slug);

    return await this.experiencesService.findOne(slug);
  }
}

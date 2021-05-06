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

  @Post()
  async createExperience(@Body() dto: ExperienceDto): Promise<Experience> {
    return await this.experiencesService.createExperience(dto);
  }
}

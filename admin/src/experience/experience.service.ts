import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExperienceDto } from '../experience/dto/experience.dto';
import { Experience } from '../experience/types/experience';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel('Experience')
    private readonly experiencesModel: Model<Experience>,
  ) {}

  async createExperience(dto: ExperienceDto): Promise<Experience> {
    return await new this.experiencesModel(dto).save();
  }
}

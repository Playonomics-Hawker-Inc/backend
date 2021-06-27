import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { CategorySchema } from '../category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}

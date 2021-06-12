import { HttpModule, Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { CategorySchema } from '../category/schemas/category.schema';
import { SessionService } from '../session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Experience', schema: ExperienceSchema },
        { name: 'Category', schema: CategorySchema },
      ],
      'experience',
    ),
    HttpModule,
  ],
  providers: [ExperienceService, SessionService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}

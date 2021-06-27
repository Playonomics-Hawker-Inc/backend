import { HttpModule, Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { TemplateSchema } from '../template/schemas/template.schema';

import { CategorySchema } from '../category/schemas/category.schema';
import { SessionService } from '../session/session.service';
import { TemplateService } from '../template/template.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Experience', schema: ExperienceSchema },
        { name: 'Category', schema: CategorySchema },
        { name: 'Template', schema: TemplateSchema },
      ],
      'feed',
    ),
    HttpModule,
  ],
  providers: [ExperienceService, SessionService, TemplateService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}

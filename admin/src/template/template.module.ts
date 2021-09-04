import { HttpModule, Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { TemplateSchema } from '../template/schemas/template.schema';
import { SessionService } from '../session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Experience', schema: ExperienceSchema },
        { name: 'Template', schema: TemplateSchema },
      ],
      'feed',
    ),
    HttpModule,
  ],
  providers: [TemplateService, SessionService],
  controllers: [TemplateController],
  exports: [TemplateService],
})
export class TemplateModule {}

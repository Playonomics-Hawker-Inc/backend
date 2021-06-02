import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { TemplateSchema } from '../template/schemas/template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Template', schema: TemplateSchema },
    ]),
  ],
  providers: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}

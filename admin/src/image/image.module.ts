import { HttpModule, Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from '../experience/schemas/experience.schema';
import { SessionService } from '../session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Experience', schema: ExperienceSchema }],
      'experience',
    ),
    HttpModule,
  ],
  providers: [ImageService, SessionService],
  controllers: [ImageController],
})
export class ImageModule {}

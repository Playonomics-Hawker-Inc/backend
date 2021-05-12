import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from '../experience/schemas/experience.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Experience', schema: ExperienceSchema },
    ]),
  ],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}

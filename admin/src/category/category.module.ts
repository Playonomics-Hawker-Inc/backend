import { HttpModule, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { SessionService } from '../session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Category', schema: CategorySchema }],
      'feed',
    ),
    HttpModule,
  ],
  providers: [CategoryService, SessionService],
  controllers: [CategoryController],
})
export class CategoryModule {}

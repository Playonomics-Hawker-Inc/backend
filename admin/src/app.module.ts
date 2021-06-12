import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './image/upload.module';
import { ImageModule } from './image/image.module';

import { ExperienceModule } from './experience/experience.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TemplateModule } from './template/template.module';
import { SessionModule } from './session/session.module';

// https://www.learmoreseekmore.com/2020/04/nestjs-multiple-mongodb-databases.html
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.AUTH, {
      connectionName: 'auth',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    MongooseModule.forRoot(process.env.EXPERIENCE, {
      connectionName: 'experience',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    MongooseModule.forRoot(process.env.CART_ORDER, {
      connectionName: 'cart-order',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    MongooseModule.forRoot(process.env.ADMIN, {
      connectionName: 'admin',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    UploadModule,
    ExperienceModule,
    CategoryModule,
    UserModule,
    AuthModule,
    ImageModule,
    TemplateModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

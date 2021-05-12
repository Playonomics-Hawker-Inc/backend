import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Request, Response } from 'express';

@Controller('v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('experience')
  async addProductImage(@Req() req: Request, @Res() res: Response) {
    return await this.imageService.uploadDisplayImage(req, res);
  }
}

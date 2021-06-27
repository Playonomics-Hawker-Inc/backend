import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('v1/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getAll(@Query() query) {
    return await this.catalogService.getAll(query);
  }
}

// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Query,
//   Param,
//   Delete,
//   Patch,
// } from '@nestjs/common';
// import { ExperiencesService } from './experiences.service';
// import { ExperiencesDto } from '../experience/dto/experience.dto';
// import { Experiences } from '../experience/types/experience';

// @Controller('experiences/v1')
// export class ExperiencesController {
//   constructor(private readonly experiencesService: ExperiencesService) {}
//   @Post()
//   async addExperiences(@Body() dto: ExperiencesDto): Promise<Experiences> {
//     return await this.experiencesService.addExperiences(dto);
//   }
//   @Patch(':id')
//   async updateExperiences(
//     @Param('id') expId: string,
//     @Body('title') expTitle: string,
//     @Body('description') expDescription: string,
//     @Body('currency') expCurrency: string,
//     @Body('status') expStatus: string,
//   ) {
//     await this.experiencesService.updateExperiences(
//       expId,
//       expTitle,
//       expDescription,
//       expCurrency,
//       expStatus,
//     );
//     return 'experience Updated';
//   }
// }

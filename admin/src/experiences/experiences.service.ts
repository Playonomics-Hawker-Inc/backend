// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { ExperiencesDto } from '../experience/dto/experience.dto';
// import { Experiences } from '../experience/types/experience';

// @Injectable()
// export class ExperiencesService {
//   constructor(
//     @InjectModel('Experiences')
//     private readonly experiencesModel: Model<Experiences>,
//   ) {}
//   private experiences: Experiences[] = [];

//   /**
//    *
//    * @param dto
//    */
//   async addExperiences(dto: ExperiencesDto): Promise<Experiences> {
//     const saved = await new this.experiencesModel(dto).save();
//     return saved;
//   }

//   private async getExperiences(id: string): Promise<Experiences> {
//     let experiences;
//     try {
//       experiences = await this.experiencesModel.findById(id);
//     } catch (error) {
//       throw new NotFoundException('Could not find experience');
//     }
//     if (!experiences) {
//       throw new NotFoundException('Could not find experience');
//     }
//     return experiences;
//   }

//   async getExperiencesById(experiencesId: string) {
//     const experiences = await this.getExperiences(experiencesId);
//     return {
//       _id: experiences._id,
//       title: experiences.title,
//       description: experiences.description,
//       currency: experiences.currency,
//       status: experiences.status,
//     };
//   }
//   async updateExperiences(
//     experiencesId: string,
//     experiencesTitle: string,
//     experiencesDescription: string,
//     experiencesCurrency: string,
//     experiencesStatus: string,
//   ) {
//     const updatedExperiences = await this.getExperiences(experiencesId);

//     if (experiencesTitle) {
//       updatedExperiences.title = experiencesTitle;
//     }
//     if (experiencesDescription) {
//       updatedExperiences.description = experiencesDescription;
//     }
//     if (experiencesCurrency) {
//       updatedExperiences.currency = experiencesCurrency;
//     }
//     if (experiencesStatus) {
//       updatedExperiences.status = experiencesStatus;
//     }
//     updatedExperiences.save();
//   }
// }

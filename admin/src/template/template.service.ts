import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './types/template';
import { TemplateDto } from './dto/template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel('Template') private templateModel: Model<Template>,
  ) {}

  /**
   * Create a template for the experience
   * @param dto
   * @returns
   */
  async createTemplate(dto: TemplateDto): Promise<Template> {
    // map the components with attributes map
    dto.components.map((component) => {
      component.attributesMap = new Map(JSON.parse(component.attributesMap));
    });
    return await new this.templateModel(dto).save();
  }

  /**
   * Get templates for an experience slug
   * @param slug
   * @returns
   */
  async getTemplates(slug: string) {
    return await this.templateModel.find({ 'experience.slug': slug });
  }

  /**
   *
   * @param slug
   * @param title
   * @returns
   */
  async getTemplate(slug: string, title: string): Promise<Template> {
    return await this.templateModel.findOne({
      'experience.slug': slug,
      title: title,
    });
  }

  async getAvailableTitles(slug: string) {
    let something = await this.templateModel
      .find({ 'experience.slug': slug })
      .select('title');
    console.log('something', something);
  }
}

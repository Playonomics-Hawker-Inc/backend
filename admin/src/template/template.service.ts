import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './types/template';
import { ComponentsDto, TemplateDto } from './dto/template.dto';
import { ExperienceDto } from '../experience/dto/experience.dto';

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
   *
   * @param dto
   */
  async editTemplate(dto: TemplateDto) {
    // map the components with attributes map
    const template = await this.templateModel.findOne({ _id: dto._id });

    dto.components.map((component) => {
      component.attributesMap = new Map(JSON.parse(component.attributesMap));
    });

    await template.updateOne(dto);
  }

  async setAsDefault(dto: TemplateDto) {
    // map the components with attributes map
    const template = await this.templateModel.findOne({ _id: dto._id });

    dto.components.map((component) => {
      component.attributesMap = new Map(JSON.parse(component.attributesMap));
    });

    await template.updateOne(dto);
  }

  /**
   * Create a default template when a new experience is created
   * @param dto
   */
  async createDefaultTemplate(dto: ExperienceDto, slug: string) {
    let templateDto = new TemplateDto();
    templateDto.title = 'Default';
    let components = [];
    let cDto = new ComponentsDto();
    cDto.index = 0;
    cDto.attributesMap = new Map([
      ['hintText', 'Just a hint'],
      ['helperText', 'A helper text'],
    ]);
    cDto.type = 'edittext';
    components.push(cDto);

    templateDto.components = components;
    templateDto.experience = { slug: slug };
    await new this.templateModel(templateDto).save();
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

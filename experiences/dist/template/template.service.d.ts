import { Model } from 'mongoose';
import { Template } from './types/template';
import { TemplateDto } from './dto/template.dto';
export declare class TemplateService {
    private templateModel;
    constructor(templateModel: Model<Template>);
    createTemplate(dto: TemplateDto): Promise<Template>;
    getTemplates(slug: string): Promise<Template[]>;
}

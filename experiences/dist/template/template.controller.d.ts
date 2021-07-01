import { TemplateService } from './template.service';
import { TemplateDto } from './dto/template.dto';
import { Template } from './types/template';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    createCategory(dto: TemplateDto): Promise<Template>;
    getTemplates(slug: string): Promise<Template[]>;
}

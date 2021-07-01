import { ExperienceService } from './experience.service';
import { ExperienceDto } from '../experience/dto/experience.dto';
import { Experience } from '../experience/types/experience';
export declare class ExperienceController {
    private readonly experiencesService;
    constructor(experiencesService: ExperienceService);
    getAll(query: any): Promise<Experience[]>;
    createExperience(dto: ExperienceDto): Promise<Experience>;
    searchExperienceByTitleAutoComplete(query: any): Promise<Experience[]>;
    findOne(slug: string): Promise<Experience>;
}

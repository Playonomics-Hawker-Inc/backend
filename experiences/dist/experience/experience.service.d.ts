import { Model } from 'mongoose';
import { ExperienceDto } from '../experience/dto/experience.dto';
import { Experience } from '../experience/types/experience';
import { Category } from '../category/types/category';
export declare class ExperienceService {
    private readonly experiencesModel;
    private categoryModel;
    constructor(experiencesModel: Model<Experience>, categoryModel: Model<Category>);
    createExperience(dto: ExperienceDto): Promise<Experience>;
    getAll(query: any): Promise<Experience[]>;
    findOne(slug: string): Promise<Experience>;
    searchExperienceByTitleAutoComplete(query: String): Promise<Experience[]>;
    private getPaginatedResponse;
}

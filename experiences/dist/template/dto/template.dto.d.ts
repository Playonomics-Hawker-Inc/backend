export declare class ComponentsDto {
    index: number;
    attributesMap: any;
    type: string;
}
export declare class TemplateDto {
    _id: string;
    title: string;
    components: [ComponentsDto];
    experience: string;
}

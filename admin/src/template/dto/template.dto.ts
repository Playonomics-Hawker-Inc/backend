export class ComponentsDto {
  index: number;
  attributesMap: any;

  type: string;
}

export class TemplateDto {
  _id: string;
  title: string;
  components: [ComponentsDto];
  experience: string;
}

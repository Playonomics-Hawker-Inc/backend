export class ExperienceDto {
  id: string;
  title: string;
  description: string;
  currency: string;
  status: string;
  slug: string;
  images: [ImageDto];
}

export class ImageDto {
  url: string;
  type: string;
}

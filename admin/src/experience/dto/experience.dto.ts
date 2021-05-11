export class ExperienceDto {
  id: string;
  title: string;
  description: string;
  price: any;
  status: string;
  slug: string;
  theme: string;
  images: [ImageDto];
}

export class ImageDto {
  url: string;
  type: string;
}

export class PriceDto {
  price: number;
  currency: string;
}

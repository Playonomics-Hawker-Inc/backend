export class ExperienceDto {
  _id: string;
  title: string;
  description: string;
  price: any;
  status: string;
  slug: string;
  theme: string;
  images: [ImageDto];
  category: any;
}

export class ImageDto {
  url: string;
  type: string;
}

export class PriceDto {
  price: number;
  currency: string;
}

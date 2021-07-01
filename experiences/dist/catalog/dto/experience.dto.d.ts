export declare class ExperienceDto {
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
export declare class ImageDto {
    url: string;
    type: string;
}
export declare class PriceDto {
    price: number;
    currency: string;
}

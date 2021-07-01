import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    getAll(query: any): Promise<import("./types/experience").Experience[]>;
}

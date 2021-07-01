"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModule = void 0;
const common_1 = require("@nestjs/common");
const catalog_controller_1 = require("./catalog.controller");
const catalog_service_1 = require("./catalog.service");
const experience_schema_1 = require("./schemas/experience.schema");
const category_schema_1 = require("../category/schemas/category.schema");
const mongoose_1 = require("@nestjs/mongoose");
let CatalogModule = class CatalogModule {
};
CatalogModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Experience', schema: experience_schema_1.ExperienceSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
            ]),
        ],
        controllers: [catalog_controller_1.CatalogController],
        providers: [catalog_service_1.CatalogService],
    })
], CatalogModule);
exports.CatalogModule = CatalogModule;
//# sourceMappingURL=catalog.module.js.map
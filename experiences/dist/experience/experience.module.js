"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceModule = void 0;
const common_1 = require("@nestjs/common");
const experience_service_1 = require("./experience.service");
const experience_controller_1 = require("./experience.controller");
const mongoose_1 = require("@nestjs/mongoose");
const experience_schema_1 = require("../experience/schemas/experience.schema");
const category_schema_1 = require("../category/schemas/category.schema");
let ExperienceModule = class ExperienceModule {
};
ExperienceModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Experience', schema: experience_schema_1.ExperienceSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
            ]),
        ],
        providers: [experience_service_1.ExperienceService],
        controllers: [experience_controller_1.ExperienceController],
    })
], ExperienceModule);
exports.ExperienceModule = ExperienceModule;
//# sourceMappingURL=experience.module.js.map
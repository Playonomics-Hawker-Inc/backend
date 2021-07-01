"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const experience_service_1 = require("./experience.service");
const experience_dto_1 = require("../experience/dto/experience.dto");
const passport_1 = require("@nestjs/passport");
const admin_guard_1 = require("../auth/guards/admin.guard");
let ExperienceController = class ExperienceController {
    constructor(experiencesService) {
        this.experiencesService = experiencesService;
    }
    async getAll(query) {
        return await this.experiencesService.getAll(query);
    }
    async createExperience(dto) {
        return await this.experiencesService.createExperience(dto);
    }
    async searchExperienceByTitleAutoComplete(query) {
        const experiences = await this.experiencesService.searchExperienceByTitleAutoComplete(query);
        return experiences;
    }
    async findOne(slug) {
        console.log('Got slug', slug);
        return await this.experiencesService.findOne(slug);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [experience_dto_1.ExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "createExperience", null);
__decorate([
    common_1.Get('autocomplete'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "searchExperienceByTitleAutoComplete", null);
__decorate([
    common_1.Get(':slug'),
    __param(0, common_1.Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "findOne", null);
ExperienceController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), admin_guard_1.AdminGuard),
    common_1.Controller('v1/experience'),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService])
], ExperienceController);
exports.ExperienceController = ExperienceController;
//# sourceMappingURL=experience.controller.js.map
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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ExperienceService = class ExperienceService {
    constructor(experiencesModel, categoryModel) {
        this.experiencesModel = experiencesModel;
        this.categoryModel = categoryModel;
    }
    async createExperience(dto) {
        const category = await this.categoryModel.findOne({
            slug: dto.category.toString(),
        });
        dto.category = {
            _id: category._id,
            name: category.name,
            slug: category.slug,
        };
        return await new this.experiencesModel(dto).save();
    }
    async getAll(query) {
        const result = await this.getPaginatedResponse({}, query);
        return result;
    }
    async findOne(slug) {
        return await this.experiencesModel.findOne({ slug: slug.toString() }, { __v: 0 });
    }
    async searchExperienceByTitleAutoComplete(query) {
        return await this.experiencesModel.aggregate([
            {
                $search: {
                    autocomplete: {
                        path: 'title',
                        query: query,
                    },
                },
            },
            { $limit: 5 },
            {
                $project: {
                    title: 1,
                    description: 1,
                    status: 1,
                    price: 1,
                    theme: 1,
                    images: 1,
                    slug: 1,
                },
            },
        ]);
    }
    async getPaginatedResponse(matchQuery, query) {
        const reqQuery = Object.assign({}, query);
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach((param) => delete reqQuery[param]);
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
        const pagination = {};
        let total = await this.experiencesModel.find(matchQuery).countDocuments();
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || total;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        if (endIndex < total) {
            pagination['next'] = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            pagination['prev'] = {
                page: page - 1,
                limit,
            };
        }
        pagination['pageCount'] = Math.ceil(total / limit);
        const result = await this.experiencesModel.aggregate([
            { $match: matchQuery },
            {
                $project: {
                    title: 1,
                    description: 1,
                    price: 1,
                    status: 1,
                    slug: 1,
                    images: 1,
                    theme: 1,
                },
            },
            {
                $facet: {
                    metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
                    experiences: [{ $skip: startIndex }, { $limit: limit }],
                },
            },
        ]);
        return result[0];
    }
};
ExperienceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Experience')),
    __param(1, mongoose_1.InjectModel('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ExperienceService);
exports.ExperienceService = ExperienceService;
//# sourceMappingURL=experience.service.js.map
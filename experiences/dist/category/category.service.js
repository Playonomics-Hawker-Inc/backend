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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async createCategory(dto) {
        return await new this.categoryModel(dto).save();
    }
    async getAllCategories(query) {
        return await this.getPaginatedResponse({}, query);
    }
    async findByCategoryId(id) {
        return await this.categoryModel.findOne({ categoryId: id });
    }
    async editCategory(dto) {
        const category = await this.categoryModel.findById(dto._id);
        await category.updateOne(dto);
        return await this.categoryModel.findById(dto._id);
    }
    async deleteCategory(id) {
        const category = await this.categoryModel.findById(id.toString());
        if (category) {
            await category.deleteOne();
        }
        else {
            throw new common_1.HttpException('Category Not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async searchCategoryByNameAutoComplete(query) {
        return await this.categoryModel.aggregate([
            {
                $search: {
                    autocomplete: {
                        path: 'name',
                        query: query,
                    },
                },
            },
            { $limit: 5 },
            {
                $project: {
                    name: 1,
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
        let total = await this.categoryModel.find(matchQuery).countDocuments();
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
        const result = await this.categoryModel.aggregate([
            { $match: matchQuery },
            {
                $project: {
                    name: 1,
                    description: 1,
                    slug: 1,
                },
            },
            {
                $facet: {
                    metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
                    categories: [{ $skip: startIndex }, { $limit: limit }],
                },
            },
        ]);
        console.log('Got result', result);
        return result[0];
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByPayload(payload) {
        const { id } = payload;
        return await this.userModel.findOne({ _id: id });
    }
    async deleteUser(userId) {
        await this.userModel.deleteOne({ _id: userId }).exec();
    }
    async getUser(id) {
        let user;
        try {
            user = await this.userModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('User Not Found');
        }
        if (!user) {
            throw new common_1.NotFoundException('User Not Found');
        }
        return user;
    }
    async login(userDTO) {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        }
        else {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async sanitizeUser(user) {
        let sanitized = user;
        delete sanitized['password'];
        return sanitized;
    }
    async getUserById(userId) {
        let user = await this.getUser(userId);
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            address: user.address,
            phone: user.phone,
            created: user.created,
            authorities: user.authorities,
        };
    }
    async getAll(query) {
        const result = await this.getPaginatedResponse({}, query);
        return result;
    }
    async getPaginatedResponse(matchQuery, query) {
        const reqQuery = Object.assign({}, query);
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach((param) => delete reqQuery[param]);
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
        const pagination = {};
        let total = await this.userModel.find(matchQuery).countDocuments();
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
        const result = await this.userModel.aggregate([
            { $match: matchQuery },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    admin: 1,
                    authorities: 1,
                    email: 1,
                    phone: 1,
                    created: 1,
                },
            },
            {
                $facet: {
                    metadata: [{ $count: 'total' }, { $addFields: { page: pagination } }],
                    users: [{ $skip: startIndex }, { $limit: limit }],
                },
            },
        ]);
        return result[0];
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
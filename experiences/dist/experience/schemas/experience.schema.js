"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceSchema = exports.PriceSchema = exports.ImageSchema = void 0;
const mongoose = require("mongoose");
exports.ImageSchema = new mongoose.Schema({
    url: String,
    type: {
        type: String,
        enum: ['display', 'banner', 'tagged', 'promotional', 'mobile'],
        default: 'display',
    },
});
exports.PriceSchema = new mongoose.Schema({
    price: Number,
    currency: {
        type: String,
        enum: ['USD', 'INR'],
        default: 'USD',
    },
    symbol: {
        type: String,
        enum: ['$', 'Rs'],
        default: '$',
    },
});
exports.ExperienceSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: exports.PriceSchema,
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    category: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        name: String,
        slug: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    theme: String,
    images: [exports.ImageSchema],
});
exports.ExperienceSchema.pre('save', async function (next) {
    this['slug'] = slugify(this['title']);
    function slugify(string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');
        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(p, (c) => b.charAt(a.indexOf(c)))
            .replace(/&/g, '-and-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
});
//# sourceMappingURL=experience.schema.js.map
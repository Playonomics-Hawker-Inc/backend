"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        maxlength: 32,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'hidden', 'inactive'],
        default: 'active',
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    createdDated: { type: Date, default: Date.now },
});
exports.CategorySchema.pre('save', async function (next) {
    this['slug'] = slugify(this['name']);
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
//# sourceMappingURL=category.schema.js.map
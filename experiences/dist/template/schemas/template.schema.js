"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSchema = exports.ComponentSchema = void 0;
const mongoose = require("mongoose");
exports.ComponentSchema = new mongoose.Schema({
    index: Number,
    type: {
        type: String,
        required: true,
        enum: ['edittext', 'textarea', 'image', 'question', 'header', 'paragraph'],
    },
    attributesMap: {
        type: Map,
        of: String,
    },
});
exports.TemplateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Template title is required'],
        trim: true,
        maxlength: 32,
    },
    components: [exports.ComponentSchema],
    experience: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience',
        },
        name: String,
        slug: String,
    },
});
//# sourceMappingURL=template.schema.js.map
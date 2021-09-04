import * as mongoose from 'mongoose';

/**
 * A componet is made of a type which is predefined and a map of attributes
 */
export const ComponentSchema = new mongoose.Schema({
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

/**
 * Template consists of a title, an array of components and belogs to an experience
 */
export const TemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Template title is required'],
    trim: true,
    maxlength: 32,
  },
  components: [ComponentSchema],
  state: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  experience: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
    },

    name: String,
    slug: String,
  },
});

// import * as mongoose from 'mongoose';

// export const ImageSchema = new mongoose.Schema({
//   url: String,
//   type: {
//     type: String,
//     enum: ['display', 'banner', 'tagged', 'promotional', 'mobile'],
//     default: 'display',
//   },
// });

// export const PriceSchema = new mongoose.Schema({
//   price: Number,
//   currency: {
//     type: String,
//     enum: ['USD', 'INR'],
//     default: 'USD',
//   },
//   symbol: {
//     type: String,
//     enum: ['$', 'Rs'],
//     default: '$',
//   },
// });

// export const ExperienceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: PriceSchema,
//   slug: {
//     type: String,
//     unique: true,
//     index: true,
//   },
//   category: {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Category',
//     },
//     name: String,
//     slug: String,
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ['active', 'inactive'],
//     default: 'active',
//   },
//   theme: String,
//   images: [ImageSchema],
// });

// /**
//  * Slugify
//  */
// ExperienceSchema.pre('save', async function (next) {
//   this['slug'] = slugify(this['title']);

//   function slugify(string) {
//     const a =
//       'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
//     const b =
//       'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
//     const p = new RegExp(a.split('').join('|'), 'g');

//     return string
//       .toString()
//       .toLowerCase()
//       .replace(/\s+/g, '-') // Replace spaces with -
//       .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
//       .replace(/&/g, '-and-') // Replace & with 'and'
//       .replace(/[^\w\-]+/g, '') // Remove all non-word characters
//       .replace(/\-\-+/g, '-') // Replace multiple - with single -
//       .replace(/^-+/, '') // Trim - from start of text
//       .replace(/-+$/, ''); // Trim - from end of text
//   }
// });

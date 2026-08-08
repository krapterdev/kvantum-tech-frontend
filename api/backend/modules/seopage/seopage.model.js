import mongoose from 'mongoose';

const seoPageSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g. 'best-service-in-usa'
  title: { type: String, required: true },
  content: { type: String, required: true },
  metaTitle: { type: String, required: true },
  metaDesc: { type: String, required: true },
  metaKeywords: { type: String, default: '' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Configure virtual getter so frontend can access "slug" alongside Mongoose "_id"
seoPageSchema.virtual('slug').get(function() {
  return this._id;
});

export const SeoPage = mongoose.model('SeoPage', seoPageSchema);

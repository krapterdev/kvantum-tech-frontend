import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g. 'rag-chatbots'
  title: { type: String, required: true },
  category: { type: String, default: 'Web & App Dev' },
  date: { type: String, default: '' },
  readTime: { type: String, default: '5 min read' },
  author: { type: String, default: 'Kvantum Tech Team' },
  image: { type: String, default: '' },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  keywords: { type: String, default: '' },
  canonical: { type: String, default: '' },
  metaTitle: { type: String, default: '' },
  metaDesc: { type: String, default: '' },
  ogTitle: { type: String, default: '' },
  ogDesc: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  ogType: { type: String, default: 'article' },
  twitterTitle: { type: String, default: '' },
  twitterDesc: { type: String, default: '' },
  twitterCard: { type: String, default: 'summary_large_image' },
  schemaMarkup: { type: String, default: '' },
  otherSeoTags: { type: String, default: '' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Configure virtual getter so frontend can access "id" alongside Mongoose "_id"
blogSchema.virtual('id').get(function() {
  return this._id;
});

export const Blog = mongoose.model('Blog', blogSchema);

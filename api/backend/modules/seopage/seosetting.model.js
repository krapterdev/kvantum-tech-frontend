import mongoose from 'mongoose';

const seoSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  content: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  keywords: {
    type: String,
    default: ''
  },
  schema: {
    type: String,
    default: ''
  },
  other: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const SeoSetting = mongoose.model('SeoSetting', seoSettingSchema);

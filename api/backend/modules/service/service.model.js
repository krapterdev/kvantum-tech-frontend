import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g. 'digital-marketing'
  iconName: { type: String, default: 'Code' },
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  color: { type: String, default: 'var(--accent-cyan)' },
  techStack: { type: String, default: '' },
  metrics: { type: String, default: '' },
  metaTitle: { type: String, default: '' },
  metaDesc: { type: String, default: '' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Configure virtual getter so frontend can access "id" alongside Mongoose "_id"
serviceSchema.virtual('id').get(function() {
  return this._id;
});

export const Service = mongoose.model('Service', serviceSchema);

import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New' },
  quality: { type: String, default: 'Warm' },
  notes: { type: String, default: '' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Configure virtual getter so frontend can access "id" alongside Mongoose "_id"
leadSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Lead = mongoose.model('Lead', leadSchema);

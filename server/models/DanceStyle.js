const mongoose = require('mongoose');

function slugify(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const danceStyleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, required: true },
    skillLevel: { type: String, default: 'Beginner' },
    ageGroup: { type: String, default: 'All ages' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80' },
    bannerImage: { type: String, default: '' },
    gallery: [{ type: String }],
    benefits: [{ type: String }],
    schedule: { type: String, default: 'Contact us for batch availability' },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

danceStyleSchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
  next();
});

module.exports = mongoose.model('DanceStyle', danceStyleSchema);

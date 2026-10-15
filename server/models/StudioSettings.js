const mongoose = require('mongoose');

const studioSettingsSchema = new mongoose.Schema(
  {
    studioName: { type: String, default: 'Nritya Nova' },
    managerName: { type: String, default: 'Jalpa Mam' },
    role: { type: String, default: 'Manager and Lead Choreographer' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    instagram: { type: String, default: '' },
    address: { type: String, default: '' },
    logo: { type: String, default: '' },
    childrenFee: { type: Number, default: 1200 },
    adultFee: { type: Number, default: 1500 },
    childAgeRange: { type: String, default: 'Ages 4-17' },
    classTimes: { type: String, default: 'Flexible timings; confirmed by the studio.' },
    availabilityNote: { type: String, default: 'Contact us anytime; class timings are confirmed by the studio.' },
    classFormats: { type: [String], default: ['Private', 'Group', 'Workshops'] },
    socials: { type: Object, default: {} },
    notificationPreferences: { type: Object, default: { email: false, dashboard: true } }
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudioSettings', studioSettingsSchema);

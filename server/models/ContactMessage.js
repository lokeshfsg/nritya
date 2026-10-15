const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    preferredContactMethod: { type: String, default: 'Phone' },
    read: { type: Boolean, default: false },
    responseNote: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);

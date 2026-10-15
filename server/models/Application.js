const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    note: { type: String, default: '' },
    changedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    applicationReference: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    parentGuardianName: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    age: { type: Number, default: 0 },
    studentCategory: { type: String, enum: ['Child', 'Adult'], default: 'Child' },
    gender: { type: String, default: '' },
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String, default: '' },
    email: { type: String, default: '' },
    preferredDanceStyle: { type: String, required: true },
    experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    preferredDaysAndTimes: { type: String, default: '' },
    preferredClassFormat: { type: String, default: '' },
    addressOrCity: { type: String, default: '' },
    additionalMessage: { type: String, default: '' },
    consentToPrivacyPolicy: { type: Boolean, default: false },
    indicativeFee: { type: Number, default: 0 },
    status: { type: String, enum: ['New', 'Under Review', 'Contacted', 'Accepted', 'Rejected'], default: 'New' },
    statusHistory: [statusHistorySchema],
    adminNotes: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);

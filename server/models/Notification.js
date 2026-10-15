const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['application', 'message'], required: true },
    entityType: { type: String, default: 'application' },
    relatedId: { type: mongoose.Schema.Types.ObjectId, refPath: 'entityType', default: null },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);

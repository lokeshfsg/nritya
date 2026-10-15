const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Application = require('../models/Application');
const ContactMessage = require('../models/ContactMessage');
const Notification = require('../models/Notification');
const DanceStyle = require('../models/DanceStyle');
const FAQ = require('../models/FAQ');
const StudioSettings = require('../models/StudioSettings');
const { getIO } = require('../config/socket');

async function getAdminProfile(req, res) {
  res.json({ success: true, data: req.admin });
}

async function logoutAdmin(req, res) {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully.' });
}

async function getDashboardStats(req, res) {
  const [totalApplications, newApplications, pendingApplications, acceptedApplications, rejectedApplications, totalContactMessages, unreadMessages, totalStudents] = await Promise.all([
    Application.countDocuments({ isDeleted: false }),
    Application.countDocuments({ isDeleted: false, status: 'New' }),
    Application.countDocuments({ isDeleted: false, status: { $in: ['Under Review', 'Contacted'] } }),
    Application.countDocuments({ isDeleted: false, status: 'Accepted' }),
    Application.countDocuments({ isDeleted: false, status: 'Rejected' }),
    ContactMessage.countDocuments({ isDeleted: false }),
    ContactMessage.countDocuments({ isDeleted: false, read: false }),
    0
  ]);

  const byStatus = await Application.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const byDanceStyle = await Application.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$preferredDanceStyle', count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
    { $limit: 5 }
  ]);

  const byCategory = await Application.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$studentCategory', count: { $sum: 1 } } }
  ]);

  const overTime = await Application.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  res.json({
    success: true,
    data: {
      totals: {
        totalApplications,
        newApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
        totalContactMessages,
        unreadMessages,
        totalStudents
      },
      charts: {
        byStatus,
        byDanceStyle,
        byCategory,
        overTime
      }
    }
  });
}

async function getApplications(req, res) {
  const { status, danceStyle, studentCategory, search } = req.query;
  const query = { isDeleted: false };

  if (status) query.status = status;
  if (danceStyle) query.preferredDanceStyle = danceStyle;
  if (studentCategory) query.studentCategory = studentCategory;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { applicationReference: { $regex: search, $options: 'i' } },
      { phoneNumber: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const applications = await Application.find(query).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: applications });
}

async function getApplicationById(req, res) {
  const application = await Application.findById(req.params.id);
  if (!application || application.isDeleted) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  res.json({ success: true, data: application });
}

async function updateApplicationStatus(req, res) {
  const { status, note } = req.body || {};
  const application = await Application.findById(req.params.id);
  if (!application || application.isDeleted) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  application.status = status;
  application.statusHistory.push({
    status,
    note: note || 'Status updated by admin',
    changedAt: new Date()
  });
  await application.save();

  res.json({ success: true, message: 'Application status updated.', data: application });
}

async function updateApplicationNotes(req, res) {
  const { adminNotes } = req.body || {};
  const application = await Application.findById(req.params.id);
  if (!application || application.isDeleted) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  application.adminNotes = adminNotes || '';
  await application.save();

  res.json({ success: true, data: application });
}

async function deleteApplication(req, res) {
  const application = await Application.findById(req.params.id);
  if (!application || application.isDeleted) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  application.isDeleted = true;
  await application.save();
  res.json({ success: true, message: 'Application deleted.' });
}

async function getMessages(req, res) {
  const { read, search } = req.query;
  const query = { isDeleted: false };

  if (read !== undefined) query.read = read === 'true';
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } }
    ];
  }

  const messages = await ContactMessage.find(query).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: messages });
}

async function markMessageRead(req, res) {
  const message = await ContactMessage.findById(req.params.id);
  if (!message || message.isDeleted) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }

  message.read = true;
  await message.save();
  res.json({ success: true, data: message });
}

async function deleteMessage(req, res) {
  const message = await ContactMessage.findById(req.params.id);
  if (!message || message.isDeleted) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }

  message.isDeleted = true;
  await message.save();
  res.json({ success: true, message: 'Message deleted.' });
}

async function getNotifications(req, res) {
  const notifications = await Notification.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: notifications });
}

async function markNotificationRead(req, res) {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found.' });
  }

  notification.read = true;
  await notification.save();
  res.json({ success: true, data: notification });
}

async function markAllNotificationsRead(req, res) {
  await Notification.updateMany({}, { read: true });
  res.json({ success: true, message: 'All notifications marked as read.' });
}

async function listDanceStyles(req, res) {
  const styles = await DanceStyle.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: styles });
}

async function createDanceStyle(req, res) {
  const payload = req.body || {};
  const style = await DanceStyle.create({
    name: payload.name,
    description: payload.description,
    skillLevel: payload.skillLevel || 'Beginner',
    ageGroup: payload.ageGroup || 'All ages',
    image: payload.image || '',
    active: payload.active !== false
  });
  res.status(201).json({ success: true, data: style });
}

async function updateDanceStyle(req, res) {
  const style = await DanceStyle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!style) return res.status(404).json({ success: false, message: 'Dance style not found.' });
  res.json({ success: true, data: style });
}

async function deleteDanceStyle(req, res) {
  const style = await DanceStyle.findByIdAndDelete(req.params.id);
  if (!style) return res.status(404).json({ success: false, message: 'Dance style not found.' });
  res.json({ success: true, message: 'Dance style removed.' });
}

async function listFaqs(req, res) {
  const items = await FAQ.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

async function createFaq(req, res) {
  const payload = req.body || {};
  const faq = await FAQ.create({
    question: payload.question,
    answer: payload.answer,
    active: payload.active !== false
  });
  res.status(201).json({ success: true, data: faq });
}

async function updateFaq(req, res) {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
  res.json({ success: true, data: faq });
}

async function deleteFaq(req, res) {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
  res.json({ success: true, message: 'FAQ removed.' });
}

async function getSettings(req, res) {
  const settings = await StudioSettings.findOne({});
  res.json({ success: true, data: settings || {} });
}

async function updateSettings(req, res) {
  const payload = req.body || {};
  let settings = await StudioSettings.findOne({});

  if (!settings) {
    settings = await StudioSettings.create({
      ...payload,
      childrenFee: payload.childrenFee || 1200,
      adultFee: payload.adultFee || 1500
    });
  } else {
    Object.assign(settings, payload);
    await settings.save();
  }

  res.json({ success: true, data: settings });
}

async function exportApplications(req, res) {
  const applications = await Application.find({ isDeleted: false }).lean();
  const header = ['Application Reference', 'Full Name', 'Email', 'Phone', 'Dance Style', 'Category', 'Status', 'Indicative Fee'];
  const rows = applications.map((app) => [
    app.applicationReference,
    app.fullName,
    app.email,
    app.phoneNumber,
    app.preferredDanceStyle,
    app.studentCategory,
    app.status,
    app.indicativeFee
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="nritya-nova-applications.csv"');
  res.send(csv);
}

module.exports = {
  getAdminProfile,
  logoutAdmin,
  getDashboardStats,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
  getMessages,
  markMessageRead,
  deleteMessage,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  listDanceStyles,
  createDanceStyle,
  updateDanceStyle,
  deleteDanceStyle,
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getSettings,
  updateSettings,
  exportApplications
};

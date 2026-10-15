const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const {
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
} = require('../controllers/adminController');

router.get('/me', requireAdmin, getAdminProfile);
router.post('/logout', requireAdmin, logoutAdmin);
router.get('/dashboard/stats', requireAdmin, getDashboardStats);
router.get('/applications', requireAdmin, getApplications);
router.get('/applications/export', requireAdmin, exportApplications);
router.get('/applications/:id', requireAdmin, getApplicationById);
router.patch('/applications/:id/status', requireAdmin, updateApplicationStatus);
router.patch('/applications/:id/notes', requireAdmin, updateApplicationNotes);
router.delete('/applications/:id', requireAdmin, deleteApplication);
router.get('/messages', requireAdmin, getMessages);
router.patch('/messages/:id/read', requireAdmin, markMessageRead);
router.delete('/messages/:id', requireAdmin, deleteMessage);
router.get('/notifications', requireAdmin, getNotifications);
router.patch('/notifications/:id/read', requireAdmin, markNotificationRead);
router.patch('/notifications/read-all', requireAdmin, markAllNotificationsRead);
router.get('/dance-styles', requireAdmin, listDanceStyles);
router.post('/dance-styles', requireAdmin, createDanceStyle);
router.patch('/dance-styles/:id', requireAdmin, updateDanceStyle);
router.delete('/dance-styles/:id', requireAdmin, deleteDanceStyle);
router.get('/faqs', requireAdmin, listFaqs);
router.post('/faqs', requireAdmin, createFaq);
router.patch('/faqs/:id', requireAdmin, updateFaq);
router.delete('/faqs/:id', requireAdmin, deleteFaq);
router.get('/settings', requireAdmin, getSettings);
router.patch('/settings', requireAdmin, updateSettings);

module.exports = router;

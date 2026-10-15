const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Application = require('../models/Application');
const ContactMessage = require('../models/ContactMessage');
const DanceStyle = require('../models/DanceStyle');
const FAQ = require('../models/FAQ');
const StudioSettings = require('../models/StudioSettings');
const Notification = require('../models/Notification');
const createReference = require('../utils/createReference');
const { getIO } = require('../config/socket');

function sanitizeForPublicSettings(settings) {
  if (!settings) return null;
  return {
    studioName: settings.studioName,
    managerName: settings.managerName,
    role: settings.role,
    phone: settings.phone || '',
    email: settings.email || '',
    whatsapp: settings.whatsapp || '',
    instagram: settings.instagram || '',
    address: settings.address || '',
    logo: settings.logo || '',
    childrenFee: settings.childrenFee || 1200,
    adultFee: settings.adultFee || 1500,
    childAgeRange: settings.childAgeRange || 'Ages 4-17',
    classTimes: settings.classTimes || 'Flexible timings; confirmed by the studio.',
    availabilityNote: settings.availabilityNote || 'Contact us anytime; class timings are confirmed by the studio.',
    classFormats: settings.classFormats || ['Private', 'Group', 'Workshops'],
    socials: settings.socials || {}
  };
}

async function getPublicSettings(req, res) {
  const settings = await StudioSettings.findOne({}).lean();
  res.json({ success: true, data: sanitizeForPublicSettings(settings) });
}

async function getDanceStyles(req, res) {
  const styles = await DanceStyle.find({ active: true }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: styles });
}

async function getFaqs(req, res) {
  const items = await FAQ.find({ active: true }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

async function submitApplication(req, res) {
  const payload = req.body || {};
  const required = [
    'fullName',
    'phoneNumber',
    'preferredDanceStyle',
    'studentCategory',
    'dateOfBirth'
  ];

  for (const field of required) {
    if (typeof payload[field] !== 'string' || !payload[field].trim()) {
      const fieldLabel = field === 'phoneNumber' ? 'Mobile number' : field;
      return res.status(400).json({ success: false, message: `The ${fieldLabel} field is required.` });
    }
  }

  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const phoneDigits = payload.phoneNumber.replace(/\D/g, '');
  const phoneFormatIsValid = /^[0-9+\-()\s]{7,20}$/.test(payload.phoneNumber);
  if (!phoneFormatIsValid || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return res.status(400).json({ success: false, message: 'Please enter a valid mobile number with 7 to 15 digits.' });
  }

  if (payload.consentToPrivacyPolicy !== true) {
    return res.status(400).json({ success: false, message: 'Consent to the privacy policy is required.' });
  }

  const duplicateFilter = {
    phoneNumber: payload.phoneNumber,
    preferredDanceStyle: payload.preferredDanceStyle,
    createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) }
  };

  if (payload.email) {
    duplicateFilter.email = payload.email;
  }

  const existing = await Application.findOne(duplicateFilter);

  if (existing) {
    return res.status(409).json({ success: false, message: 'A similar application was already submitted recently. Please contact the studio if you need help.' });
  }

  const settings = await StudioSettings.findOne({}).lean();
  const indicativeFee = payload.studentCategory === 'Adult' ? (settings?.adultFee || 1500) : (settings?.childrenFee || 1200);

  const application = await Application.create({
    applicationReference: createReference('NN'),
    fullName: payload.fullName,
    parentGuardianName: payload.parentGuardianName || '',
    dateOfBirth: payload.dateOfBirth,
    age: Number(payload.age) || 0,
    studentCategory: payload.studentCategory || 'Child',
    gender: payload.gender || '',
    phoneNumber: payload.phoneNumber,
    whatsappNumber: payload.whatsappNumber || '',
    email: payload.email || '',
    preferredDanceStyle: payload.preferredDanceStyle,
    experienceLevel: payload.experienceLevel || 'Beginner',
    preferredDaysAndTimes: payload.preferredDaysAndTimes || '',
    preferredClassFormat: payload.preferredClassFormat || '',
    addressOrCity: payload.addressOrCity || '',
    additionalMessage: payload.additionalMessage || '',
    consentToPrivacyPolicy: true,
    indicativeFee,
    status: 'New',
    statusHistory: [{ status: 'New', note: 'Application submitted', changedAt: new Date() }]
  });

  const notification = await Notification.create({
    type: 'application',
    entityType: 'Application',
    relatedId: application._id,
    title: 'New admission application',
    summary: `${application.fullName} applied for ${application.preferredDanceStyle}.`
  });

  const io = getIO();
  if (io) {
    io.emit('new-notification', {
      ...notification.toObject(),
      applicationReference: application.applicationReference,
      studentName: application.fullName,
      danceStyle: application.preferredDanceStyle
    });
  }

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully.',
    data: {
      applicationReference: application.applicationReference,
      status: application.status,
      indicativeFee: application.indicativeFee
    }
  });
}

async function submitContact(req, res) {
  const payload = req.body || {};

  if (!payload.fullName || !payload.phoneNumber || !payload.email || !payload.subject || !payload.message) {
    return res.status(400).json({ success: false, message: 'Please complete all required contact fields.' });
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (!emailValid) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const message = await ContactMessage.create({
    fullName: payload.fullName,
    phoneNumber: payload.phoneNumber,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    preferredContactMethod: payload.preferredContactMethod || 'Phone'
  });

  const notification = await Notification.create({
    type: 'message',
    entityType: 'ContactMessage',
    relatedId: message._id,
    title: 'New contact message',
    summary: `${message.fullName}: ${message.subject}`
  });

  const io = getIO();
  if (io) {
    io.emit('new-notification', {
      ...notification.toObject(),
      sender: message.fullName,
      subject: message.subject
    });
  }

  res.status(201).json({ success: true, message: 'Your message has been sent successfully.' });
}

async function loginAdmin(req, res) {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  });

  return res.json({
    success: true,
    data: {
      admin: {
        id: admin._id,
        username: admin.username,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role
      },
      token
    }
  });
}

module.exports = {
  getPublicSettings,
  getDanceStyles,
  getFaqs,
  submitApplication,
  submitContact,
  loginAdmin
};

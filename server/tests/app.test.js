const request = require('supertest');
const app = require('../app');
const { connectDB } = require('../config/db');
const mongoose = require('mongoose');
const Application = require('../models/Application');

describe('Nritya Nova API', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('GET /api/health returns service status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('OPTIONS /api/applications allows local frontend development ports', async () => {
    const res = await request(app)
      .options('/api/applications')
      .set('Origin', 'http://localhost:3001')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'content-type');

    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3001');
    expect(res.headers['access-control-allow-credentials']).toBe('true');
  });

  test('POST /api/applications accepts a valid admission request', async () => {
    const res = await request(app).post('/api/applications').send({
      fullName: 'Aarav Patel',
      phoneNumber: '+91 9876543210',
      email: 'aarav@example.com',
      preferredDanceStyle: 'Bollywood Dance',
      studentCategory: 'Child',
      dateOfBirth: '2016-05-10',
      age: 10,
      consentToPrivacyPolicy: true
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.applicationReference).toMatch(/^NN-/);
    const savedApplication = await Application.findOne({
      applicationReference: res.body.data.applicationReference
    });
    expect(savedApplication).not.toBeNull();
    expect(savedApplication.phoneNumber).toBe('+91 9876543210');
  });

  test('POST /api/applications requires a mobile number', async () => {
    const res = await request(app).post('/api/applications').send({
      fullName: 'Riya Patel',
      preferredDanceStyle: 'Bollywood Dance',
      studentCategory: 'Child',
      dateOfBirth: '2015-05-10',
      consentToPrivacyPolicy: true
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('The Mobile number field is required.');
  });

  test('POST /api/applications rejects a mobile number without enough digits', async () => {
    const res = await request(app).post('/api/applications').send({
      fullName: 'Riya Patel',
      phoneNumber: '123456',
      preferredDanceStyle: 'Bollywood Dance',
      studentCategory: 'Child',
      dateOfBirth: '2015-05-10',
      consentToPrivacyPolicy: true
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Please enter a valid mobile number with 7 to 15 digits.');
  });

  test('POST /api/applications accepts a valid request without an email address', async () => {
    const res = await request(app).post('/api/applications').send({
      fullName: 'Neha Joshi',
      phoneNumber: '+91 9898989898',
      preferredDanceStyle: 'Belly Dance',
      studentCategory: 'Adult',
      dateOfBirth: '1995-02-15',
      age: 31,
      preferredClassFormat: 'Regular Classes',
      preferredDaysAndTimes: 'Saturday and Sunday',
      consentToPrivacyPolicy: true
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.applicationReference).toMatch(/^NN-/);
  });

  test('POST /api/contact accepts a valid contact message', async () => {
    const res = await request(app).post('/api/contact').send({
      fullName: 'Priya Shah',
      phoneNumber: '+91 9988776655',
      email: 'priya@example.com',
      subject: 'Class timings',
      message: 'I want to enquire about timings.',
      preferredContactMethod: 'WhatsApp'
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

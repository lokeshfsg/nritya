const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
const { connectDB } = require('../config/db');
const Admin = require('../models/Admin');

async function createAdmin() {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('Set ADMIN_PASSWORD in the server environment before creating or updating the admin.');
  }

  await connectDB();

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD;

  const existing = await Admin.findOne({ username });
  if (existing) {
    existing.password = password;
    await existing.save();
    console.log(`Admin account updated: ${username}`);
    process.exit(0);
  }

  await Admin.create({
    username,
    password,
    fullName: 'Nritya Nova Administrator',
    email: 'admin@nrityanova.local',
    role: 'admin'
  });

  console.log(`Admin account created: ${username}`);
  console.log('Use a strong password in production.');
  process.exit(0);
}

createAdmin().catch((error) => {
  console.error('Failed to create admin:', error);
  process.exit(1);
});

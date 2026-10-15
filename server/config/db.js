const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDB() {
  try {
    if (process.env.NODE_ENV === 'test') {
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri();
      await mongoose.connect(uri, { dbName: 'nritya-nova-test' });
      console.log('✅ Test MongoDB connected');
      return;
    }

    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nritya-nova';
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });

    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}

module.exports = { connectDB };

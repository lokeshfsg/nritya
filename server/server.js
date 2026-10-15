const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const { initSocket } = require('./config/socket');
const { isAllowedOrigin } = require('./config/cors');
const seedDefaults = require('./services/seedDefaults');

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await seedDefaults();
  const server = http.createServer(app);
  const io = initSocket(server, isAllowedOrigin);
  app.locals.io = io;

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});

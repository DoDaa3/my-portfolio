const connectDB = require('./_lib/db');

module.exports = async function handler(req, res) {
  try {
    await connectDB();
    res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: err.message, timestamp: new Date().toISOString() });
  }
};

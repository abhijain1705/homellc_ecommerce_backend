const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  createdAt: { type: Date, expires: '1h' }
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);

module.exports = ResetToken;
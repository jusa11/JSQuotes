const mongoose = require('mongoose');

const quoteShema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Unknown' },
  userId: { type: String, default: null },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Quote', quoteShema);

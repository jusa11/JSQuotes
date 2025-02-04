const mongoose = require('mongoose');

const favoriteShema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required: true,
  },
});

module.exports = mongoose.model('Favorite', favoriteShema);

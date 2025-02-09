const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
  likedQuotes: [{ type: Schema.Types.ObjectId, ref: 'Quote' }],
});

module.exports = model('User', User);

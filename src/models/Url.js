const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', urlSchema);

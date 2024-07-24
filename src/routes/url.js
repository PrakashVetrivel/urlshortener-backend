const express = require('express');
const crypto = require('crypto');
const Url = require('../models/Url');

const router = express.Router();

// Shorten URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  try {
    const shortUrl = crypto.randomBytes(4).toString('hex'); // Simple random string
    const newUrl = new Url({ shortUrl, longUrl });
    await newUrl.save();
    res.json({ shortUrl, longUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Redirect Short URL
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).send('URL not found');
    }
    url.clicks += 1;
    await url.save();
    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

// Register
router.post('/register', async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  try {
    const user = new User({ username, firstName, lastName, password });
    await user.save();
    res.status(201).send('User registered');
    // Implement email verification logic here
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    if (!user.isActive) {
      return res.status(403).send('Account not activated');
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Password Reset (placeholder - implementation needed for email sending and token management)
router.post('/password-reset', (req, res) => {
  const { email } = req.body;
  // Implement password reset logic (email sending, token generation, etc.)
  res.send('Password reset link sent');
});

module.exports = router;

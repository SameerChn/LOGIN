const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const passport = require('passport');
const generateToken = require('../utils/generateToken');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

// Google OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account',
  access_type: 'offline'
}));

router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: (process.env.FRONTEND_URL ? process.env.FRONTEND_URL + '/login.html' : 'http://localhost:5500/docs/login.html'), 
  session: true 
}), (req, res) => {
  // Generate JWT and redirect to the correct frontend with user info
  const token = generateToken(req.user._id);
  const userData = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    token: token
  };
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500/docs';
  res.redirect(`${frontendUrl}/dashboard.html?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
});

module.exports = router;
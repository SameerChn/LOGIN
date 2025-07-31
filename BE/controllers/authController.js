const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  let { username, email, password } = req.body;

  // Normalize: if username looks like email, use only email
  if ((username && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username))) {
    email = username.toLowerCase();
    username = undefined;
  }
  if (email) {
    email = email.toLowerCase();
  }

  // Allow login with either username or email, but prioritize email if present
  let user;
  if (email) {
    user = await User.findOne({ email });
  } else if (username) {
    user = await User.findOne({ username });
  } else {
    res.status(400);
    throw new Error('Please provide username or email');
  }

  if (user) {
    const isPasswordValid = await user.comparePassword(password);
    
    if (isPasswordValid) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  let { username, email, password } = req.body;

  // Always lowercase email for registration
  if (email) {
    email = email.toLowerCase();
  }

  const userExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = {
  loginUser,
  registerUser,
};
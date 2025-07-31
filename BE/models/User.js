const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      // Password is required only if googleId is not present
      return !this.googleId;
    },
    minlength: 6,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving (only if password is provided and not a Google OAuth user)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.googleId) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (this.googleId) {
    // For Google OAuth users, we don't compare passwords
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
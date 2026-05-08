const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const logger = require('../config/logger');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findByEmail(email);

    if (userExists) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      res.status(400);
      return next(new Error('User already exists'));
    }

    // Create user (password will be hashed automatically)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      authProvider: 'LOCAL',
    });

    if (user) {
      // Generate token
      const token = generateToken({
        id: user.id,
        role: user.role,
      });

      logger.info(`User registered successfully: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400);
      return next(new Error('Invalid user data'));
    }
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email (include password for comparison)
    const user = await User.findByEmail(email);

    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    // Check if user is OAuth user
    if (user.authProvider === 'GOOGLE' && !user.password) {
      logger.warn(`Local login attempt for Google user: ${email}`);
      res.status(401);
      return next(new Error('Please login with Google'));
    }

    // Check if password matches
    const isPasswordMatch = await User.comparePassword(password, user.password);

    if (!isPasswordMatch) {
      logger.warn(`Failed login attempt for: ${email}`);
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    logger.info(`User logged in successfully: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

// @desc    Google OAuth callback
// @route   GET /api/v1/auth/google/callback
// @access  Public
const googleCallback = (req, res) => {
  try {
    // Generate JWT token
    const token = generateToken({
      id: req.user.id,
      role: req.user.role,
    });

    logger.info(`Google OAuth successful for: ${req.user.email}`);

    // Redirect to frontend with token
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendURL}/dashboard?token=${token}`);
  } catch (error) {
    logger.error('Google OAuth callback error:', error);
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendURL}/login?error=oauth_failed`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleCallback,
};

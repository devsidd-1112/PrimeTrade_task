const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findByEmail(email);

    if (userExists) {
      res.status(400);
      return next(new Error('User already exists'));
    }

    // Create user (password will be hashed automatically)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    if (user) {
      // Generate token
      const token = generateToken({
        id: user.id,
        role: user.role,
      });

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
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    // Check if password matches
    const isPasswordMatch = await User.comparePassword(password, user.password);

    if (!isPasswordMatch) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

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
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

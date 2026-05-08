const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { registerUser, loginUser, googleCallback } = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
} = require('../validations/authValidation');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

// Local auth routes
router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  registerUser
);

router.post('/login', loginValidation, handleValidationErrors, loginUser);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleCallback
);

module.exports = router;

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
} = require('../validations/authValidation');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  registerUser
);

router.post('/login', loginValidation, handleValidationErrors, loginUser);

module.exports = router;

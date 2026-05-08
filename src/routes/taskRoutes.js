const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  createTaskValidation,
  updateTaskValidation,
} = require('../validations/taskValidation');
const { handleValidationErrors } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// All task routes are protected
router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(createTaskValidation, handleValidationErrors, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTaskValidation, handleValidationErrors, updateTask)
  .delete(deleteTask);

module.exports = router;

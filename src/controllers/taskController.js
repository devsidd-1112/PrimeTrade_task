const Task = require('../models/Task');
const APIFeatures = require('../utils/apiFeatures');
const { clearUserCache } = require('../middleware/cacheMiddleware');
const logger = require('../config/logger');
const prisma = require('../config/prisma');

// @desc    Create a new task
// @route   POST /api/v1/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      createdById: req.user.id,
    });

    // Clear user cache
    await clearUserCache(req.user.id);

    logger.info(`Task created by user ${req.user.id}: ${task.id}`);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    logger.error('Create task error:', error);
    next(error);
  }
};

// @desc    Get all tasks with pagination, filtering, and search
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    // Initialize API Features
    const features = new APIFeatures({}, req.query);
    features.filter().search().paginate();

    const where = features.getWhere();
    const { skip, take, page, limit } = features.getPagination();

    // Add RBAC filter
    if (req.user.role !== 'admin') {
      where.createdById = req.user.id;
    }

    // Get tasks with pagination
    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.task.count({ where }),
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    logger.info(`Tasks fetched by user ${req.user.id}: ${tasks.length} tasks`);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalTasks,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    logger.error('Get tasks error:', error);
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      return next(new Error('Task not found'));
    }

    // Check ownership or admin role
    if (task.createdById !== req.user.id && req.user.role !== 'admin') {
      logger.warn(`Unauthorized task access attempt by user ${req.user.id}`);
      res.status(403);
      return next(new Error('Not authorized to access this task'));
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    logger.error('Get task error:', error);
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      return next(new Error('Task not found'));
    }

    // Check ownership or admin role
    if (task.createdById !== req.user.id && req.user.role !== 'admin') {
      logger.warn(`Unauthorized task update attempt by user ${req.user.id}`);
      res.status(403);
      return next(new Error('Not authorized to update this task'));
    }

    // Update task
    task = await Task.update(req.params.id, req.body);

    // Clear cache for task owner
    await clearUserCache(task.createdById);

    logger.info(`Task updated by user ${req.user.id}: ${task.id}`);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    logger.error('Update task error:', error);
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      return next(new Error('Task not found'));
    }

    // Check ownership or admin role
    if (task.createdById !== req.user.id && req.user.role !== 'admin') {
      logger.warn(`Unauthorized task delete attempt by user ${req.user.id}`);
      res.status(403);
      return next(new Error('Not authorized to delete this task'));
    }

    const ownerId = task.createdById;
    await Task.delete(req.params.id);

    // Clear cache for task owner
    await clearUserCache(ownerId);

    logger.info(`Task deleted by user ${req.user.id}: ${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {},
    });
  } catch (error) {
    logger.error('Delete task error:', error);
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};

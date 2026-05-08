const prisma = require('../config/prisma');

class TaskModel {
  // Create task
  static async create(data) {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        createdById: parseInt(data.createdById),
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Find all tasks
  static async findAll(where = {}) {
    return await prisma.task.findMany({
      where,
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
    });
  }

  // Find task by ID
  static async findById(id) {
    return await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Update task
  static async update(id, data) {
    return await prisma.task.update({
      where: { id: parseInt(id) },
      data,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Delete task
  static async delete(id) {
    return await prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = TaskModel;

const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

class UserModel {
  // Hash password
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Compare password
  static async comparePassword(candidatePassword, hashedPassword) {
    if (!hashedPassword) return false;
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  // Create user with hashed password
  static async create(data) {
    // Only hash password if provided (OAuth users may not have password)
    if (data.password) {
      const hashedPassword = await this.hashPassword(data.password);
      return await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    }

    return await prisma.user.create({
      data,
    });
  }

  // Find user by email
  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // Find user by ID
  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }

  // Find user by ID without password
  static async findByIdWithoutPassword(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        authProvider: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Find user by Google ID
  static async findByGoogleId(googleId) {
    return await prisma.user.findUnique({
      where: { googleId },
    });
  }
}

module.exports = UserModel;

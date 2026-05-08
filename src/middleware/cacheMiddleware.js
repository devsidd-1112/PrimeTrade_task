const { redisClient } = require('../config/redis');
const logger = require('../config/logger');

// Cache middleware
const cache = (duration = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    try {
      // Check if Redis is connected
      if (!redisClient.isOpen) {
        return next();
      }

      // Create cache key based on URL and user
      const cacheKey = `cache:${req.user?.id || 'guest'}:${req.originalUrl}`;

      // Try to get cached data
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        logger.info(`Cache HIT: ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      // Cache miss - store original res.json
      logger.info(`Cache MISS: ${cacheKey}`);
      const originalJson = res.json.bind(res);

      res.json = (data) => {
        // Store in cache
        redisClient
          .setEx(cacheKey, duration, JSON.stringify(data))
          .catch((err) => logger.error('Redis cache set error:', err));

        return originalJson(data);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

// Clear cache for specific user
const clearUserCache = async (userId) => {
  try {
    if (!redisClient.isOpen) return;

    const pattern = `cache:${userId}:*`;
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.info(`Cleared ${keys.length} cache entries for user ${userId}`);
    }
  } catch (error) {
    logger.error('Clear cache error:', error);
  }
};

// Clear all cache
const clearAllCache = async () => {
  try {
    if (!redisClient.isOpen) return;

    await redisClient.flushAll();
    logger.info('Cleared all cache');
  } catch (error) {
    logger.error('Clear all cache error:', error);
  }
};

module.exports = { cache, clearUserCache, clearAllCache };

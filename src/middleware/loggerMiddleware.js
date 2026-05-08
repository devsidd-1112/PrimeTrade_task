const logger = require('../config/logger');

// HTTP request logger middleware
const httpLogger = (req, res, next) => {
  const start = Date.now();

  // Log request
  logger.info({
    type: 'HTTP_REQUEST',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Capture response
  res.on('finish', () => {
    const duration = Date.now() - start;

    const logData = {
      type: 'HTTP_RESPONSE',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    };

    if (res.statusCode >= 400) {
      logger.error(logData);
    } else {
      logger.info(logData);
    }
  });

  next();
};

module.exports = { httpLogger };

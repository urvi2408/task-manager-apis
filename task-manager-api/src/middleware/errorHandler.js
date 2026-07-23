const { errorResponse } = require('../utils/response');

/**
 * Centralized error-handling middleware.
 * Catches errors thrown/passed via next(err) throughout the app.
 */
function errorHandler(err, req, res, next) {
  console.error(`[Error] ${err.name || 'Error'}: ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal Server Error';

  return errorResponse(res, statusCode, message);
}

/**
 * 404 handler for unmatched routes.
 */
function notFoundHandler(req, res) {
  return errorResponse(res, 404, `Route ${req.method} ${req.originalUrl} not found`);
}

module.exports = { errorHandler, notFoundHandler };

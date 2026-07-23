/**
 * Custom Error class for handled API errors.
 * Allows controllers/services to throw errors with a specific HTTP status code.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

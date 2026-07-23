/**
 * Standardized API response helpers.
 */

function successResponse(res, statusCode, message, data = null) {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  return res.status(statusCode).json(body);
}

function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { successResponse, errorResponse };

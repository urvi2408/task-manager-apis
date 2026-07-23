const { errorResponse } = require('../utils/response');

/**
 * Validates the request body when creating a task.
 * Required fields: title (string), description (string)
 */
function validateCreateTask(req, res, next) {
  const { title, description } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('title is required and must be a non-empty string');
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('description is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    return errorResponse(res, 400, errors.join('; '));
  }

  next();
}

/**
 * Validates the request body when updating a task (PUT).
 * At least one valid field must be provided; if present, fields must be well-formed.
 */
function validateUpdateTask(req, res, next) {
  const { title, description, status } = req.body;
  const errors = [];

  if (title === undefined && description === undefined && status === undefined) {
    errors.push('at least one of title, description, or status must be provided');
  }

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    errors.push('title must be a non-empty string');
  }

  if (description !== undefined && (typeof description !== 'string' || !description.trim())) {
    errors.push('description must be a non-empty string');
  }

  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (status !== undefined && !validStatuses.includes(status)) {
    errors.push(`status must be one of: ${validStatuses.join(', ')}`);
  }

  if (errors.length > 0) {
    return errorResponse(res, 400, errors.join('; '));
  }

  next();
}

/**
 * Validates that :id route param is a positive integer.
 */
function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return errorResponse(res, 400, 'id must be a positive integer');
  }
  next();
}

module.exports = { validateCreateTask, validateUpdateTask, validateIdParam };

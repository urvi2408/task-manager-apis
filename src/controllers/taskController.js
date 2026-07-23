const taskService = require('../services/taskService');
const { successResponse } = require('../utils/response');

/**
 * GET /tasks
 */
function getAllTasks(req, res, next) {
  try {
    const tasks = taskService.getAllTasks();
    return successResponse(res, 200, 'Tasks retrieved successfully', tasks);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /tasks/:id
 */
function getTaskById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const task = taskService.getTaskById(id);
    return successResponse(res, 200, 'Task retrieved successfully', task);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /tasks
 */
function createTask(req, res, next) {
  try {
    const { title, description } = req.body;
    const task = taskService.createTask({ title, description });
    return successResponse(res, 201, 'Task created successfully', task);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /tasks/:id
 */
function updateTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, description, status } = req.body;
    const task = taskService.updateTask(id, { title, description, status });
    return successResponse(res, 200, 'Task updated successfully', task);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /tasks/:id
 */
function deleteTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    taskService.deleteTask(id);
    return successResponse(res, 200, 'Task deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /tasks/:id/complete
 */
function completeTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const task = taskService.completeTask(id);
    return successResponse(res, 200, 'Task marked as completed', task);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
};

const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const {
  validateCreateTask,
  validateUpdateTask,
  validateIdParam,
} = require('../middleware/validateTask');

// GET /tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// GET /tasks/:id - Get a task by ID
router.get('/:id', validateIdParam, taskController.getTaskById);

// POST /tasks - Create a new task
router.post('/', validateCreateTask, taskController.createTask);

// PUT /tasks/:id - Update a task
router.put('/:id', validateIdParam, validateUpdateTask, taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', validateIdParam, taskController.deleteTask);

// PATCH /tasks/:id/complete - Mark a task as completed
router.patch('/:id/complete', validateIdParam, taskController.completeTask);

module.exports = router;

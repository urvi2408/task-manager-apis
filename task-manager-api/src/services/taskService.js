const Task = require('../models/taskModel');
const ApiError = require('../utils/ApiError');

/**
 * In-memory data store for tasks.
 */
let tasks = [];
let nextId = 1;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new ApiError(404, `Task with id ${id} not found`);
  }
  return task;
}

function createTask({ title, description }) {
  const newTask = new Task(nextId++, title.trim(), description.trim());
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const task = getTaskById(id);

  if (updates.title !== undefined) task.title = updates.title.trim();
  if (updates.description !== undefined) task.description = updates.description.trim();
  if (updates.status !== undefined) task.status = updates.status;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new ApiError(404, `Task with id ${id} not found`);
  }
  const [deleted] = tasks.splice(index, 1);
  return deleted;
}

function completeTask(id) {
  const task = getTaskById(id);
  task.status = 'completed';
  return task;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
};

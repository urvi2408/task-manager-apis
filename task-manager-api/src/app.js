const express = require('express');

const requestLogger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Built-in middleware for parsing JSON request bodies
app.use(express.json());

// Custom request logging middleware
app.use(requestLogger);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Manager API is running',
  });
});

// Task routes
app.use('/tasks', taskRoutes);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Centralized error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;

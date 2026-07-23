/**
 * Task Model
 * Defines the shape of a Task object stored in memory.
 */

class Task {
  constructor(id, title, description, status = 'pending') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }
}

module.exports = Task;

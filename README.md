# Task Manager REST API

A simple in-memory Task Manager REST API built with **Node.js** and **Express.js**, following a clean, scalable folder structure (Routes → Controllers → Services).

## Features

- Create, read, update, and delete tasks (CRUD)
- Mark tasks as completed
- Request validation for required fields
- Custom middleware for logging API requests
- Centralized error handling with proper HTTP status codes
- In-memory data storage (no database required)

## Folder Structure

```
src/
├── routes/          # Express route definitions
│   └── taskRoutes.js
├── controllers/     # Request/response handling, calls services
│   └── taskController.js
├── services/        # Business logic & in-memory data operations
│   └── taskService.js
├── middleware/       # Logging, validation, error handling
│   ├── logger.js
│   ├── validateTask.js
│   └── errorHandler.js
├── models/          # Data shape/schema definitions
│   └── taskModel.js
├── utils/           # Shared helpers (ApiError, response formatting)
│   ├── ApiError.js
│   └── response.js
├── app.js           # Express app configuration
└── server.js        # Server entry point
```

## Prerequisites

- Node.js v18 or above
- npm

## Setup Instructions

1. Clone or extract the project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Or, for auto-restart on file changes (Node 18+):
   ```bash
   npm run dev
   ```
4. The API will be running at `http://localhost:3000`.

You can change the port by setting the `PORT` environment variable.

## Task Object Shape

```json
{
  "id": 1,
  "title": "Learn Express.js",
  "description": "Complete Express.js basics",
  "status": "pending",
  "createdAt": "2026-07-23"
}
```

`status` can be one of: `pending`, `in-progress`, `completed`.

## API Endpoints

| Method | Endpoint             | Description                  |
|--------|-----------------------|-------------------------------|
| GET    | `/tasks`               | Get all tasks                |
| GET    | `/tasks/:id`           | Get a task by ID             |
| POST   | `/tasks`               | Create a new task            |
| PUT    | `/tasks/:id`           | Update a task                |
| DELETE | `/tasks/:id`           | Delete a task                |
| PATCH  | `/tasks/:id/complete`  | Mark a task as completed     |

### Example Requests

**Create a task**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express.js", "description": "Complete Express.js basics"}'
```

**Get all tasks**
```bash
curl http://localhost:3000/tasks
```

**Get a task by ID**
```bash
curl http://localhost:3000/tasks/1
```

**Update a task**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'
```

**Delete a task**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Mark a task as completed**
```bash
curl -X PATCH http://localhost:3000/tasks/1/complete
```

### Response Format

Success:
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": { "id": 1, "title": "...", "description": "...", "status": "pending", "createdAt": "2026-07-23" }
}
```

Error:
```json
{
  "success": false,
  "message": "Task with id 1 not found"
}
```

### HTTP Status Codes Used

- `200 OK` – Successful GET/PUT/DELETE/PATCH
- `201 Created` – Successful POST
- `400 Bad Request` – Validation errors (missing/invalid fields, bad id param)
- `404 Not Found` – Task or route not found
- `500 Internal Server Error` – Unexpected server errors

## Notes

- Data is stored in memory and will reset whenever the server restarts.
- Logging middleware prints each request's method, URL, response status, and duration to the console.

# User-Task-API

A simple RESTful API for managing users and tasks built with Node.js, Express.js, and MongoDB.

## Features

- User management (Create, List, View)
- Task management (Create, List, Update, Delete)
- Email validation and uniqueness
- Task-user association validation
- Comprehensive error handling
- Standard response format

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Project Structure

```
src/
  ├── index.js                   # Application entry point
  ├── models/                    # Mongoose schemas
  │   ├── task-model.js
  │   └── user-model.js
  ├── controller/                # API routes
  │   ├── task.controller.js
  │   └── user.controller.js
  ├── service/                   # Business logic
  │   ├── task.service.js
  │   └── user.service.js
  └── utils/
      └──error-handler/          # Error Handler
         └── errorHandler.js
      └── response.js            # API Response
```

## Author

[Ajay Maruda]

# Student Information System

REST API for managing student records — Node.js, Express, MongoDB.

## Endpoints

| Method | Endpoint            | Description       |
|--------|---------------------|-------------------|
| GET    | /health             | Health check      |
| GET    | /api/students       | Get all students  |
| POST   | /api/students       | Create student    |
| GET    | /api/students/:id   | Get by ID         |
| PUT    | /api/students/:id   | Update student    |
| DELETE | /api/students/:id   | Delete student    |

## Student Schema

```json
{ "name": "string", "email": "string", "age": "number", "grade": "string" }
```

## Run

```bash
npm install
MONGODB_URI=mongodb://localhost:27017/studentdb npm start
npm test
```

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
MONGODB_URI=mongodb://localhost:27017/studentdb 
npm start
npm test
```
http://localhost:3000/health
http://localhost:3000/api/students


# Health check
curl http://localhost:3000/health

# Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Naveen Kumar","email":"naveen@test.com","age":22,"grade":"A"}'

# Get all students
curl http://localhost:3000/api/students

# Get by ID (replace <id> with actual _id from create response)
curl http://localhost:3000/api/students/<id>

# Update
curl -X PUT http://localhost:3000/api/students/<id> \
  -H "Content-Type: application/json" \
  -d '{"grade":"B"}'

# Delete
curl -X DELETE http://localhost:3000/api/students/<id>

npm test
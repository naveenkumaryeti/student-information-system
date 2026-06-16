const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Student = require('../src/models/Student');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studentdb_test');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Student.deleteMany({});
});

describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

describe('POST /api/students', () => {
  it('should create a student', async () => {
    const res = await request(app).post('/api/students').send({
      name: 'Naveen Kumar', email: 'naveen@example.com', age: 20, grade: 'A'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Naveen Kumar');
  });

  it('should return 400 if required fields missing', async () => {
    const res = await request(app).post('/api/students').send({ name: 'Test' });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/students', () => {
  it('should return all students', async () => {
    await Student.create({ name: 'Alice', email: 'alice@example.com', age: 21, grade: 'B' });
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(1);
  });
});

describe('GET /api/students/:id', () => {
  it('should return a student by id', async () => {
    const student = await Student.create({ name: 'Bob', email: 'bob@example.com', age: 22, grade: 'A' });
    const res = await request(app).get(`/api/students/${student._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Bob');
  });

  it('should return 404 for non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/students/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /api/students/:id', () => {
  it('should update a student', async () => {
    const student = await Student.create({ name: 'Carol', email: 'carol@example.com', age: 23, grade: 'C' });
    const res = await request(app).put(`/api/students/${student._id}`).send({ grade: 'A' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.grade).toBe('A');
  });
});

describe('DELETE /api/students/:id', () => {
  it('should delete a student', async () => {
    const student = await Student.create({ name: 'Dave', email: 'dave@example.com', age: 24, grade: 'B' });
    const res = await request(app).delete(`/api/students/${student._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

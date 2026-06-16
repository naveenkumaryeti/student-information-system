const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Student Information System is running' });
});

app.use('/api/students', studentRoutes);

module.exports = app;

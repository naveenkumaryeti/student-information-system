const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:  { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  age:   { type: Number, required: [true, 'Age is required'], min: 1 },
  grade: { type: String, required: [true, 'Grade is required'] }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
});

const student = mongoose.model("student", studentSchema);

module.exports = student;

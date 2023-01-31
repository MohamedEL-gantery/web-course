const mongoose = require("mongoose");

const teacherShcema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  }  
});

const teacher = mongoose.model("teacher", teacherShcema);

module.exports = teacher;

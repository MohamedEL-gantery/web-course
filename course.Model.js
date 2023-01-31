const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: {
      values: ["easy", "medium", "difficult"],
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
    set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
  },
  summary: {
    type: String,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "teacher",
    required: true,
  },
});

const course = mongoose.model("course", courseSchema);

module.exports = course;

const express = require("express");
const mongooes = require("mongoose");
const bodyParser = require("body-parser");
const teacher = require("./teacherModel");
const student = require("./studentModel");
const Course = require("./course.Model");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongooes.connect(
  "mongodb://0.0.0.0:27017/web-sit",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) {
      console.log("DB Success...");
    } else {
      console.log(err);
    }
  }
);
const createOne = (Model) => async (req, res) => {
  const newData = await Model.create(req.body);

  res.status(201);
  res.json({
    status: "success",
    newData,
  });
};

const getAll = (Model) => async (req, res) => {
  const doc = await Model.find();
  // SEND RESPONSE
  res.status(200);
  res.json({
    status: "success",
    results: doc.length,
    doc,
  });
};

const updateOne = (Model) => async (req, res) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200);
  res.json({
    status: "success",
    doc,
  });
};

const getone = async (req, res) => {
  const doc = await Course.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  res.status(200);
  res.json({
    status: "success",
    doc,
  });
};

const getPrice = async (req, res) => {
  const doc = await Course.find({ price: { $gte: 1, $lte: 50 } });
  res.status(200);
  res.json({
    status: "success",
    doc,
  });
};

const createTeacher = createOne(teacher);
const createStudent = createOne(student);
const createCourse = createOne(Course);

const getAllTeacher = getAll(teacher);
const getAllStudent = getAll(student);
const getAllCourse = getAll(Course);

const updateTeacher = updateOne(teacher);
const updateCourse = updateOne(Course);

app.post("/teacher", createTeacher);
app.post("/student", createStudent);
app.post("/course", createCourse);

app.get("/allteacher", getAllTeacher);
app.get("/allstudent", getAllStudent);
app.get("/allcourse", getAllCourse);

app.get("/search/:key", getone);
app.get("/", getPrice);

app.patch("/updateCourse/:id", updateCourse);
app.patch("/updateteacher/:id", updateTeacher);

const port = 3333;
app.listen(port, () => {
  console.log(`App Running in port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/studentregdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
  regno: Number,
  name: String,
  email: String,
  department: String,
});

const Student = mongoose.model("Student", studentSchema);

app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ success: true, message: "Student saved!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.listen(2000, () => {
  console.log("Server running on port 2000");
});
const { default: mongoose } = require("mongoose");
const Student = require("../models/user.models.js");

// create new student
const createStudent = async (req, res) => {
  const { name, email, className, classRoll } = req.body;

  if (!name || !email || !className || !classRoll) {
    return res.status(404).json({ error: "All fields are required" });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(404).json({ error: "Please enter valid email" });
  }

  try {
    const user = await Student.findOne({ email });
    if (user) {
      return res.status(404).json({ error: "user already exist" });
    }

    const newUser = new Student({
      name,
      email,
      className,
      classRoll,
    });
    await newUser.save();
    res.status(200).json({ success: newUser });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Internal server error" });
  }
};

// show all students data
const allStudents = async (req, res) => {
  try {
    const data = await Student.find();
    res.status(200).json({ success: data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// updateStudent
const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({
        success: updatedUser,
        message: "Student data update successfully",
      });
  } catch (error) {
    res.status(400).json("error hai");
  }
};

// delete student
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await Student.findByIdAndDelete(id);
    res.status(200).json({ success: "Student delete successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
  console.log(id);
};

module.exports = { createStudent, allStudents, updateStudent, deleteStudent };

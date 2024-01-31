const express = require("express");
const router = express.Router();

const {
  createStudent,
  allStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/userControllers");

// create student
router.post("/create", createStudent);

// show all students
router.get("/all", allStudents);

// update student

router.put("/update/:id", updateStudent);

// delete student

router.delete("/delete/:id", deleteStudent);

module.exports = router;

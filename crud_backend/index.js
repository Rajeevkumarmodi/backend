const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const router = require("./routes/userRoutes");
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/student", router);

// database connection

(function () {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database connect successfull "))
    .catch((error) => console.log("connection error", error.message));
})();

// app listen
app.listen(PORT, () => {
  console.log(`Server is listen on Port ${PORT}`);
});

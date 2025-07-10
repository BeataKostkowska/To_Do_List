require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const {
  createNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,
} = require("./controllers/task.controller.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error(`Didn't connect to database: ${err.errmsg}`);
  }
};

app.post("/api/tasks", createNewTask);
app.get("/api/tasks", getAllTasks);
app.patch("/api/tasks/:id", updateTask);
app.delete("/api/tasks/:id", deleteTask);
app.delete("/api/tasks", deleteAllTasks);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  connectDatabase();
  console.log(`Server listening on port ${port}`);
});

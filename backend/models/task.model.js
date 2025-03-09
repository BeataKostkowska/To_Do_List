const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskName: { type: String, required: true, trim: true },
    priority: { type: Number, min: 1, max: 5 },
    deadline: { type: Date },
    completed: { type: Boolean, default: 0 },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

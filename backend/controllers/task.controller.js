const Task = require("./../models/task.model.js");

exports.createNewTask = async (req, res) => {
  const newTask = new Task(req.body);

  try {
    await newTask.save();
    res.status(201).json({ status: "success", data: { task: newTask } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Failed to create task" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({ status: "success", data: { allTasks } });
  } catch (error) {
    res
      .status(400)
      .json({ status: "fail", message: "Failed to display tasks" });
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask)
      return res
        .status(404)
        .json({ status: "fail", message: "No task with that id" });

    res.status(200).json({ status: "success", data: { task: updatedTask } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task)
      return res
        .status(404)
        .json({ status: "fail", message: "No task with that id" });

    res.status(201).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Failed to delete task" });
  }
};

exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany();
    res.status(201).json({ status: "success", data: null });
  } catch (error) {
    res
      .status(400)
      .json({ status: "fail", message: "Failed to delete all tasks" });
  }
};

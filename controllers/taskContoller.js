const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch {
    res.status(404).json("no task");
  }
};

module.exports = { getTasks };

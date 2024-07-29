const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch {
    res.status(404).json("no task");
  }
};

const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).send("error");
  }
};
const updateTaskbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      res.status(404).send("error");
    }
    const updatedTask = await Task.findById(id);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).send("error");
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).send("task not found");
    }

    res.status(200).json("task deleted successfully");
  } catch (error) {
    res.status(404).send("error");
  }
};

module.exports = { getTasks, addTask, deleteTask, updateTaskbyID };

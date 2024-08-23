const Task = require("../models/task");

//inbox route
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks);
  } catch {
    res.status(404).json("no task");
  }
};
//add task route
const addTask = async (req, res) => {
  try {
    // Log authenticated user for debugging
    console.log("Authenticated user:", req.user);

    // Attach the user ID from the authenticated user to the task
    const taskData = {
      ...req.body,
      user: req.user.id, // Get the user ID from the authenticated user
    };

    // Log task data for debugging
    console.log("Task data being created:", taskData);

    // Create the task with the attached user ID
    const task = await Task.create(taskData);

    res.status(200).json(task);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(404).send("Error adding task");
  }
};
//update task
const updateTaskbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task || task.user.toString() !== req.user.id) {
      res.status(404).send("error");
    }
    const updatedTask = await Task.findById(id);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).send("error");
  }
};
//delete task
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
// show only today task route

const todaytask = async (req, res) => {
  try {
    // Fetch all tasks for the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    console.log("Fetched tasks:", tasks); // Log all tasks

    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    console.log("Today's date:", today); // Log today's date

    // Filter tasks where the dueDate is today
    const dueTodayTasks = tasks.filter((task) => {
      if (!task.due) {
        return false; // Skip tasks with no due date
      }
      const dueDateFormatted = new Date(task.due).toISOString().split("T")[0];
      console.log("Task due date:", dueDateFormatted); // Log due date for each task
      return dueDateFormatted === today;
    });

    // Respond with the tasks due today
    console.log("Tasks due today:", dueTodayTasks); // Log filtered tasks
    res.status(200).json(dueTodayTasks);
  } catch (error) {
    console.error("Error fetching today's tasks:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching today's tasks" });
  }
};
//upcoming route
const getFutureTasks = async (req, res) => {
  try {
    // Fetch all tasks for the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    console.log("Fetched tasks:", tasks); // Log all tasks

    // Get today's date in the format YYYY-MM-DD
    const now = new Date();

    // Filter tasks where the dueDate is in the future
    const futureTasks = tasks.filter((task) => {
      if (!task.due) {
        return false; // Skip tasks with no due date
      }
      const dueDate = new Date(task.due);
      return dueDate > now; // Check if due date is in the future
    });

    // Respond with the tasks due in the future
    console.log("Tasks due in the future:", futureTasks); // Log filtered tasks
    res.status(200).json(futureTasks);
  } catch (error) {
    console.error("Error fetching future tasks:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching future tasks" });
  }
};
//completed route
const completedTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id, completed: true });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};
//filter on the base of priority

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTaskbyID,
  todaytask,
  getFutureTasks,
  completedTask,
};

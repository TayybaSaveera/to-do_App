const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  due: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
    required: true,
  },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;

const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/AuthMiddleware");
const {
  getTasks,
  addTask,
  deleteTask,
  updateTaskbyID,
  todaytask,
  getFutureTasks,
  completedTask,
} = require("../controllers/TaskController");

router.get("/task", isAuthenticated, getTasks);
router.post("/addtask", isAuthenticated, addTask);
router.put("/updatetask/:id", isAuthenticated, updateTaskbyID);
router.delete("/deletetask/:id", isAuthenticated, deleteTask);
router.get("/today", isAuthenticated, todaytask);
router.get("/upcoming", isAuthenticated, getFutureTasks);
router.get("/completed", isAuthenticated, completedTask);
module.exports = router;

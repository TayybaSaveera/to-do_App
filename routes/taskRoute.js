const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const {
  getTasks,
  addTask,
  deleteTask,
  updateTaskbyID,
} = require("../controllers/taskContoller");

router.get("/task", protect, getTasks);
router.post("/addtask", protect, addTask);
router.put("/updatetask/:id", protect, updateTaskbyID);
router.delete("/deletetask/:id", protect, deleteTask);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getTasks,
  addTask,
  deleteTask,
  updateTaskbyID,
} = require("../controllers/taskContoller");

router.get("/task", getTasks);
router.post("/addtask", addTask);
router.put("/updatetask/:id", updateTaskbyID);
router.delete("/deletetask/:id", deleteTask);

module.exports = router;

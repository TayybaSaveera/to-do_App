const express = require("express");
const router = express.Router();
const { getTasks } = require("../controllers/taskContoller");

router.get("/task", getTasks);

module.exports = router;

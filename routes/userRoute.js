const express = require("express");
const router = express.Router();
const { RegisterUser, Login } = require("../controllers/userController.js");

router.post("/SignUp", RegisterUser);
router.post("/Login", Login);

module.exports = router;

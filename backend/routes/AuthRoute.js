const express = require("express");
const isAuthenticated = require("../middleware/AuthMiddleware");
const router = express.Router();
const {
  Register,
  Login,
  profile,
  Logout,
} = require("../controllers/AuthController");
router.post("/signup", Register);
router.post("/login", Login);
router.get("/profile", isAuthenticated, profile);
router.post("/Logout", Logout);

module.exports = router;

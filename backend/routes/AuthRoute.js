const express = require("express");
const isAuthenticated = require("../middleware/AuthMiddleware");
const router = express.Router();
const {
  Register,
  Login,
  profile,
  Logout,
  // updateAccount,
  deleteAccount,
  updateName,
  updateEmail,
} = require("../controllers/AuthController");
router.post("/signup", Register);
router.post("/login", Login);
router.get("/profile", isAuthenticated, profile);
router.post("/Logout", isAuthenticated, Logout);
// router.put("/updateuser/:id", isAuthenticated, updateAccount);
router.delete("/deleteAccount/:id", isAuthenticated, deleteAccount);
router.put("/updateName/:id", isAuthenticated, updateName);
router.put("/updateEmail/:id", isAuthenticated, updateEmail);
module.exports = router;

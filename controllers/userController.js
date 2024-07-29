const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//token creation
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.secretkey, { expiresIn: "7d" });
};

//user registration (signup)
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const token = generateToken(user);
    await user.save();
    // res.status(200).json("registered successfully");
    res.json(token);
  } catch {
    res.status(404).json("error");
  }
};
//login
const Login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const token = generateToken(user);

    // res.status(200).json("registered successfully");
    res.json(token);
  } catch {
    res.status(404).json("error");
  }
};
module.exports = { RegisterUser, Login };

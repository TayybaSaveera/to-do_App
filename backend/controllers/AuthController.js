const User = require("../models/user.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");

require("dotenv").config();
const jwtSecret = process.env.secret;

const bcryptSalt = bcrypt.genSaltSync(10);

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check if password is correct
    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(422).json("Incorrect password");
    }

    // Generate JWT token
    jwt.sign(
      { id: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "24h" }, // Token expires in 2 minutes
      (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          return res.status(500).json("Internal server error");
        }

        // Save the token in the session
        req.session.token = token;

        // Send token and user info as the response
        res.status(200).json({
          message: "Login successful",
          token: token,
          user: { id: user._id, email: user.email },
        });
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal server error");
  }
};

const profile = async (req, res) => {
  try {
    // Access the user data that was set by the middleware after token validation
    const user = await User.findById(req.user.id); // req.user is set by the middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user profile data
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

const Logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    // Optionally, clear the cookie
    res.clearCookie("connect.sid"); // 'connect.sid' is the default cookie name for express-session

    res.status(200).json({ message: "Logged out successfully" });
  });
};
//update name
const updateName = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user but do not overwrite the password
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("User does not exist");
    }

    // Update only allowed fields (e.g., email)
    user.name = req.body.name || user.name;

    // Save updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error");
  }
};

//update email
const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    // Find the user but do not overwrite the password
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("User does not exist");
    }

    // Check if password is correct
    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(422).json("Incorrect password");
    }

    // Update only allowed fields (e.g., email)
    user.email = email || user.email;

    // Save updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error");
  }
};

//delete account
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send("user not found");
    }

    res.status(200).send("user deleted successfully");
  } catch (error) {
    res.status(404).send("error");
  }
};
module.exports = {
  Register,
  Login,
  profile,
  Logout,
  // updateAccount,
  deleteAccount,
  updateName,
  updateEmail,
};

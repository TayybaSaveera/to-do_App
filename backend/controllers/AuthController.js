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
      { expiresIn: "2m" }, // Token expires in 2 minutes
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
// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json("User not found");
//     }

//     // Check if password is correct
//     const passOk = bcrypt.compareSync(password, user.password);
//     if (!passOk) {
//       return res.status(422).json("Incorrect password");
//     }

//     // Generate JWT token
//     jwt.sign(
//       { id: user._id, email: user.email },
//       jwtSecret,
//       { expiresIn: "2m" }, // Token expires in 1 hour
//       (err, token) => {
//         if (err) {
//           console.error("Error generating token:", err);
//           return res.status(500).json("Internal server error");
//         }

//         // Set token in HTTP-only cookie
//         res
//           .cookie("token", token, {
//             httpOnly: true, // Prevent client-side JS from accessing the cookie
//             secure: process.env.NODE_ENV === "production", // Use secure cookie only in production
//             maxAge: 2 * 60 * 1000, // 1 hour
//             sameSite: "Strict", // Optional: Helps prevent CSRF attacks
//           })
//           .status(200) // Status 200 for successful login
//           .json({
//             message: "Login successful",
//             user: { id: user._id, email: user.email },
//           });
//       }
//     );
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json("Internal server error");
//   }
// };

// const profile = async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, async (err, user) => {
//       if (err) throw err;
//       const { name, email, _id } = await User.findById(user.id);
//       res.json(name, email, _id);
//     });
//   } else {
//     res.json(null);
//   }
// };
//

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

// const Logout = async (req, res) => {
//   res.cookie("token", "").json("true");
// };
const Logout = async (req, res) => {
  // Clear the token cookie
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Cookie expires immediately
  });

  res.json({ message: "Logged out successfully" });
};

module.exports = { Register, Login, profile, Logout };

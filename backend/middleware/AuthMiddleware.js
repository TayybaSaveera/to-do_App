// const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.secret; // Make sure you have a valid secret key
// function isAuthenticated(req, res, next) {
//   const token = req.session.token; // Retrieve the token from the session
//   if (!token) {
//     return res.status(401).json({ message: "You need to log in first" });
//   }

//   // Verify the JWT token
//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // Attach the decoded token data (user info) to req.user
//     req.user = decoded;
//     next(); // Proceed to the next middleware or route handler
//   });
// }

// module.exports = isAuthenticated;
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid or expired" });
    }

    req.user = user; // Store user information in request object
    next();
  });
};

module.exports = authenticateToken;

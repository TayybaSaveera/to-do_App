const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.secret; // Make sure you have a valid secret key
function isAuthenticated(req, res, next) {
  const token = req.session.token; // Retrieve the token from the session
  if (!token) {
    return res.status(401).json({ message: "You need to log in first" });
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the decoded token data (user info) to req.user
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = isAuthenticated;

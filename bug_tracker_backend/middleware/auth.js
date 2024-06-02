const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader); // Log the authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log("Authenticated User:", req.user); // Log authenticated user
    next();
  });
};

module.exports = authenticateToken;

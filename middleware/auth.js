const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing Token" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], config.secretKey); //this will only take the "token" part of Token
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

module.exports = authMiddleware;

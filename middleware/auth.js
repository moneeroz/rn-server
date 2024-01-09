const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config({ path: "./config/.env" });

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const data = jwt.verify(authHeader, process.env.JWT_SECRET);
  let user;
  try {
    user = await User.findOne({ where: { id: data.id } });
  } catch (err) {
    return res.status(500).send(err);
  }

  if (!user) {
    return res.status(401).send("Access denied. No user.");
  }
  req.user = user;

  next();
};

// Database Conniction Info
const Sequelize = require("sequelize");

// Use .env file in config folder
require("dotenv").config({ path: "config/.env" });

const config = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  },
);

module.exports = config;

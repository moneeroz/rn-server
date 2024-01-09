const Sequelize = require("sequelize");
const config = require("../config/database");

const Category = config.define(
  "category",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false },
);

module.exports = Category;

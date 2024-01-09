const Sequelize = require("sequelize");
const config = require("../config/database");

const Ingredient = config.define(
  "ingredient",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    extra: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: false },
);

module.exports = Ingredient;

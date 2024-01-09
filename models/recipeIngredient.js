const Sequelize = require("sequelize");
const config = require("../config/database");

const RecipeIngredient = config.define(
  "recipeIngredient",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, updatedAt: false },
);

module.exports = RecipeIngredient;

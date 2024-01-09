const Sequelize = require("sequelize");
const config = require("../config/database");
const User = require("./user");
const Recipe = require("./recipe");

const Favourite = config.define(
  "favourite",
  {
    // userId: {
    //   type: Sequelize.STRING,
    //   refrences: {
    //     model: User,
    //     key: "id",
    //   },
    // },
    // recipeId: {
    //   type: Sequelize.STRING,
    //   refrences: {
    //     model: Recipe,
    //     key: "id",
    //   },
    // },
  },
  { timestamps: true, updatedAt: false },
);

module.exports = Favourite;

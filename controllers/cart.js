const Recipe = require("../models/recipe");
const Cart = require("../models/cart");

module.exports = {
  // Retrieve user cart items from the Database
  getCartItems: (req, res) => {
    const userId = req.params.user_id;
    const data = {
      where: { userId },
      include: [{ model: Recipe, as: "recipe", required: true }],
    };

    Cart.findAll(data)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err.message);
      });
  },
  // Add a recipe to cart
  addToCart: (req, res) => {
    const userId = req.params.user_id;
    const recipeId = req.params.recipe_id;

    Cart.create({ userId, recipeId })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err.message);
      });
  },
  // Delete a recipe from cart
  deleteFromCart: (req, res) => {
    const userId = req.params.user_id;
    const recipeId = req.params.recipe_id;

    Cart.findOne({ where: { userId, recipeId } })
      .then((result) => {
        // Check if the recipe exists in the database table
        if (!result) {
          res.status(404).send("Recipe not found in your cart!");
          return;
        }
        // Delete the recipe from cart table in the Database
        result
          .destroy()
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Clear Cart
  clearCart: (req, res) => {
    const userId = req.params.user_id;

    Cart.findAll({ where: { userId } })
      .then((result) => {
        // Check if the user exists in the database table
        if (!result) {
          res.status(404).send("No recipes in your cart!");
          return;
        }
        // Delete the recipes from cart table in the Database
        Cart.destroy({ where: { userId } })
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");

// Get all user  cart recipes
router.get("/:user_id", cartController.getCartItems);
// Add a recipe to user carts
router.post("/:user_id/:recipe_id", cartController.addToCart);
// Delete a recipe from user carts
router.delete("/:user_id/:recipe_id", cartController.deleteFromCart);
// Clear user cart
router.delete("/:user_id/", cartController.clearCart);

module.exports = router;

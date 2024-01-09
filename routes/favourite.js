const express = require("express");
const router = express.Router();

const favouriteController = require("../controllers/favourite");

// Get all user  favourite recipes
router.get("/:user_id", favouriteController.getUserFavourites);
// Add a recipe to user favourites
router.post("/:user_id/:recipe_id", favouriteController.addToFavourites);
// Delete a recipe from user favourites
router.delete("/:user_id/:recipe_id", favouriteController.deletefromFavourites);

module.exports = router;

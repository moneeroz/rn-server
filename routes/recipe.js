const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../controllers/recipe");

// Get all recipes
router.get("/", recipeController.getRecipes);
// Get all recipes  paginated
router.get("/page", recipeController.getPaginatedRecipes);
// Get recipes based on category
router.get("/categories/:catagory_id", recipeController.getCategoryRecipes);
// Get a recipe by id
router.get("/:id", recipeController.getRecipe);
// Create a recipe
router.post(
  "/create-recipe",
  upload.single("image"),
  recipeController.createRecipe,
);
// Create a recipe
router.put(
  "/update-recipe/:id",
  upload.single("image"),
  recipeController.updateRecipe,
);
// Delete a recipe by id
router.delete("/delete-recipe/:id", recipeController.deleteRecipe);

module.exports = router;

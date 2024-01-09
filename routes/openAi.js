const express = require("express");
const router = express.Router();
const { createRecipe } = require("../controllers/openAi");

router.post("/create-recipe", createRecipe);

module.exports = router;

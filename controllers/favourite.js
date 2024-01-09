const Recipe = require("../models/recipe");
const Favourite = require("../models/favourite");

module.exports = {
  // Retrieve all user favourites
  getUserFavourites: (req, res) => {
    const userId = req.params.user_id;
    const data = {
      where: { userId },
      include: [{ model: Recipe, as: "recipe", required: true }],
    };

    Favourite.findAll(data)
      .then((result) => {
        res.status(200).send(result.map((item) => item.recipe));
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err, err.message);
      });
  },
  // Add a recipe to a user favourites
  addToFavourites: (req, res) => {
    const userId = req.params.user_id;
    const recipeId = req.params.recipe_id;

    Favourite.create({ userId, recipeId })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err.message);
      });
  },
  // Delete a recipe from a user favourites
  deletefromFavourites: (req, res) => {
    const userId = req.params.user_id;
    const recipeId = req.params.recipe_id;

    Favourite.findOne({ where: { userId, recipeId } })
      .then((result) => {
        // Check if the recipe exists in the database table
        if (!result) {
          res.status(404).send("Recipe not found in your favourites!");
          return;
        }
        // Delete the recipe from favourite table in the Database
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
};

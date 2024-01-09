const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

module.exports = {
  // Retrieve all recipes from the Database
  getRecipes: (req, res) => {
    Recipe.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  //
  getPaginatedRecipes: async (req, res) => {
    const page = req.query.page;
    const limit = 2;
    const offset = (page - 1) * limit;

    await Recipe.findAll({
      limit: limit,
      offset: offset,
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Retrieve recipes based on catagory from the Database
  getCategoryRecipes: (req, res) => {
    const category_id = req.params.catagory_id;
    Recipe.findAll({ where: { category_id } })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Retrieve a recipe by id the Database
  getRecipe: (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByPk(recipeId, {
      include: Ingredient,
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Create a new recipe in the Database
  createRecipe: async (req, res) => {
    const id = uuidv4();
    const {
      name,
      ingredients,
      directions,
      category_id,
      prep_time,
      about,
      tags,
      difficulty,
    } = req.body;
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipes",
      });
      console.log(result);

      await Recipe.create({
        id,
        name,
        image: result.secure_url,
        prep_time,
        cloudinary_id: result.public_id,
        ingredients,
        directions,
        category_id,
        about,
        tags,
        difficulty,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  },
  // edit recipe in the database
  updateRecipe: (req, res) => {
    const recipeId = req.params.id;
    const data = req.body;

    Recipe.findByPk(recipeId).then(async (result) => {
      // Check if the recipe exists in the database table
      if (!result) {
        res.status(404).send("Recipe not found!");
        return;
      }
      try {
        const cloudinaryResult = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "recipes",
          },
        );
        console.log(cloudinaryResult);
        await cloudinary.uploader.destroy(result.cloudinary_id);

        result.name = data.name;
        result.ingredients = data.ingredients;
        result.directions = data.directions;
        result.category_id = data.category_id;
        result.image = cloudinaryResult.secure_url;
        result.cloudinary_id = cloudinaryResult.public_id;
        result.prep_time = data.prep_time;
        result.about = data.about;
        result.tags = data.tags;
        result.difficulty = data.difficulty;

        result
          .save()
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } catch (err) {
        res.status(500).send(err);
      }
    });
  },
  // Delete a recipe from the Database
  deleteRecipe: (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByPk(recipeId)
      .then((result) => {
        // Check if the recipe exists in the database table
        if (!result) {
          res.status(404).send("Recipe not found!");
          return;
        }

        // Delete the recipe from database
        result
          .destroy()
          .then(async () => {
            await cloudinary.uploader.destroy(result.cloudinary_id);
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

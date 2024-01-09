const express = require("express");
const app = express();
const config = require("./config/database");
const Catagory = require("./models/catagory");
const Favourite = require("./models/favourite");
const Recipe = require("./models/recipe");
const User = require("./models/user");
const Cart = require("./models/cart");
const cors = require("cors");
const logger = require("morgan");
const recipeRoutes = require("./routes/recipe");
const userRoutes = require("./routes/user");
const favouriteRoutes = require("./routes/favourite");
const cartRoutes = require("./routes/cart");
const openAiRoute = require("./routes/openAi");
const Ingredient = require("./models/ingredient");
const RecipeIngredient = require("./models/recipeIngredient");

const auth = require("./middleware/auth");

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public")); //This makes our plublic folder including the uploads folder public
app.use(logger("dev")); // Logging

// DB table associations
User.belongsToMany(Recipe, { through: Favourite });
Recipe.belongsToMany(User, { through: Favourite });
User.hasMany(Favourite);
Favourite.belongsTo(User);
Recipe.hasMany(Favourite);
Favourite.belongsTo(Recipe);

User.belongsToMany(Recipe, { through: Cart });
Recipe.belongsToMany(User, { through: Cart });
User.hasMany(Cart);
Cart.belongsTo(User);
Recipe.hasMany(Cart);
Cart.belongsTo(Recipe);

Catagory.hasMany(Recipe, { foreignKey: "category_id" });
Recipe.belongsTo(Catagory, { foreignKey: "category_id" });

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

// Test DB connection
config
  .authenticate()
  .then(() => {
    console.log("Databae is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Sync models to DB --migrate
// config.sync();

// Routes
app.use("/api/recipes", recipeRoutes); // Recipe routes
app.use("/api", userRoutes); // User routes
app.use("/api/recipes/favourites", auth, favouriteRoutes); // Favourite routes
app.use("/api/recipes/cart", auth, cartRoutes); // Cart routes
app.use("/api/openai", openAiRoute); // custom recipe route

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

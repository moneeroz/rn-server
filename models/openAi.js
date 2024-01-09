const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config({ path: "../config/.env" });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (prompt) => {
  const imgPrompt = `Generate a top view professional food plate image of a recipe that has ingredients from: ${prompt}`;
  const imgResult = await openai.createImage({
    prompt: imgPrompt,
    n: 1,
    size: "512x512",
    response_format: "b64_json",
  });

  const imgUrl = `data:image/png;base64,${imgResult.data.data[0].b64_json}`;
  return imgUrl;
};

const extractRecipeData = (content) => {
  const recipeNameRegex = /Recipe Name:\s*(.+?)\n\n/m;
  const ingredientsRegex = /Ingredients:\s*([\s\S]+?)\n\n/m;

  const recipeNameMatch = content.match(recipeNameRegex);
  const ingredientsMatch = content.match(ingredientsRegex);

  const recipeName = recipeNameMatch ? recipeNameMatch[1] : "";
  const ingredients = ingredientsMatch ? ingredientsMatch[1] : "";

  return { recipeName, ingredients };
};

module.exports = { generateImage, extractRecipeData };

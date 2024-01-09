const { Configuration, OpenAIApi } = require("openai");
const { generateImage, extractRecipeData } = require("../models/openAi");

require("dotenv").config({ path: "../config/.env" });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const createRecipe = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const recipePrompt = `Generate a recipe that contains all the following recipe name and ingredients: ${prompt}`;

    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional chef that can make real recipes that has a recipe name, prep time, ingredients and directions from ingredients. you can assume that the user has common spices like salt, black pepper, sugar, water, and such",
        },
        { role: "user", content: recipePrompt },
      ],
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0.3,
    });

    const response = chat_completion.data.choices[0].message;
    const content = response.content;

    const extractedData = extractRecipeData(content);
    const imgURL = await generateImage(extractedData);

    res.status(200).json({ imgURL, content });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = { createRecipe };

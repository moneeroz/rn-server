const cloudinary = require("cloudinary").v2;

// Use .env file in config folder
require("dotenv").config({ path: "../config/.env" });

// Setting up cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;

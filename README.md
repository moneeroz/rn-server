# React Native Recipes BACK-END

Stack: Node.js, Express, PostegresDB, Sequelize, and OpenAI SDK

This is a REST API for the front-end of the RN Recipes project

The code was written in javascript following the MVC methodology and used a few external apis such as openAi and cloudinary

This project was developed by [Me](https://github.com/Moneeroz)
<br>

## Getting Started

clone the front-end repo from [Here](https://github.com/moneeroz/rn-recipes) and follow its ReadMe to get it running!

To run the following project on your machine please follow the steps below:

<br>

1. Install all dependencies.

```
npm install
```

2. You will find a .env.example inside the config folder.

- Rename .env.example to .env
- Generate your api keys and database credintials (any sql db) and add them to the .env
- Inside the config folder there is a database.js, make sure your dialect is set to the proper SQL database you are using

3. Run the server.

```
node index.js
```

const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const bcrybt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });

module.exports = {
  // Register / Create a new user in the Database
  register: (req, res) => {
    const saltRounds = 10;
    const plainTextPassword = req.body.password;

    // Auto generate a salt and a hash of the plainTextPassword
    bcrybt.hash(plainTextPassword, saltRounds, (err, hash) => {
      const id = uuidv4();
      let { username, email, password } = req.body;
      password = hash;

      // Add user to the Database
      User.create({
        id,
        username,
        email,
        password,
      })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  },
  // Login / Retrieve user by email and password
  login: (req, res) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    const data = { where: { email } };

    // Retrieve user from the Database based on email
    User.findOne(data)
      .then((result) => {
        if (!result) {
          return res.status(404).send("User does not exist");
        }
        // Compare planTextPassword to the hash password stord in the Database
        return bcrybt.compare(
          plainTextPassword,
          result.password,
          (err, output) => {
            if (!output) {
              return res.status(400).send("Incorrect password");
            }

            // Create a token
            const token = jwt.sign(
              { id: result.id, email: result.email, username: result.username },
              process.env.JWT_SECRET,
              { expiresIn: "7d" },
            );
            const user = {
              id: result.id,
              email: result.email,
              username: result.username,
            };
            return res.status(200).send({ user, token });
          },
        );
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // update user password
  updatePassword: (req, res) => {
    const saltRounds = 10;
    const oldPlainTextPassword = req.body.old_password;
    const plainTextPassword = req.body.new_password;
    const id = req.params.id;

    // Auto generate a salt and a hash of the plainTextPassword
    bcrybt.hash(plainTextPassword, saltRounds, (err, hash) => {
      const password = hash;

      // Check if old password coming from body matches the user old password befe updating
      User.findOne({ where: { id } })
        .then((result) => {
          if (!result) {
            return res.status(404).send("User does not exist");
          }
          // Compare planTextPassword to the hash password stord in the Database
          return bcrybt.compare(
            oldPlainTextPassword,
            result.password,
            (err, output) => {
              if (!output) {
                return res.status(400).send("Incorrect password");
              }
              // Update user password in the Database
              User.update({ password }, { where: { id } })
                .then((result) => {
                  res.status(200).send(result);
                })
                .catch((err) => {
                  res.status(500).send(err);
                });
            },
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};

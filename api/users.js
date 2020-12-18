require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const models = require("../models");

// GET api/users/test (public)
router.get("/test", (req, res) => {
  res.json({ msg: "User endpoint confirmed" });
});

// POST api/users/register (public)
router.post("/register", (req, res) => {
  // find user by email
  models.User.findOne({ email: req.body.email }).then((user) => {
    // if email already exists send 400 response
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const newUser = new models.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(newUser);
      // salt and hash password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          // Change password to hash
          newUser.password = hash;
          newUser
            .save()
            .then((createdUser) => {
              return res.json(createdUser);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// POST route for users/login (Public)
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find a user via email
  models.User.findOne({ email }).then((user) => {
    console.log(`USER: ${user}`);
    // If there is not a user
    if (!user) {
      res.status(400).json({ msg: "User not found" });
    } else {
      // If there is a user in the database
      bcrypt.compare(password, user.password).then((isMatch) => {
        console.log(`ISMATCH: ${isMatch}`);
        // Check password for match
        if (isMatch) {
          // If user match, send a JSON Web Token
          // Create a token payload
          const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
          };
          // Sign token
          jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (error, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          });
        } else {
          return res
            .status(400)
            .json({ msg: "Email or password is incorrect" });
        }
      });
    }
  });
});

// GET api/users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;

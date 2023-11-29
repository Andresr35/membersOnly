const User = require("../models/users");
const passport = require("passport");
const asyncHander = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.getUserForm = asyncHander(async (req, res, next) => {
  res.render("signUpForm");
});

exports.getUserInfo = asyncHander(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.render("user", { user: user });
});

exports.getLogIn = asyncHander(async (req, res, next) => {
  res.render("logIn");
});

exports.getLogOut = asyncHander(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/");
    }
  });
});

exports.postLogIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

exports.postUserForm = [
  body("username", "Must enter a username")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "Enter a first name").trim().isLength({ min: 1 }).escape(),
  body("lastName", "Enter a last name").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 5 }).escape(),
  body("passwordConfirmation", "passwords must match").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
  asyncHander(async (req, res, next) => {
    const errors = validationResult(req);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      });
      if (!errors.isEmpty()) {
        res.render("signUpForm");
        return;
      } else {
        await user.save();
        res.redirect(user.url);
      }
    });
  }),
];

const User = require("../models/users");
const Post = require("../models/posts");
const passport = require("passport");
const asyncHander = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.getUserForm = asyncHander(async (req, res, next) => {
  res.render("signUpForm");
});

exports.getUserInfo = asyncHander(async (req, res, next) => {
  const [user, posts] = await Promise.all([
    User.findById(req.params.id),
    Post.find({ user: req.user._id }),
  ]);
  console.log(req.user);
  res.render("user", { user: user, posts: posts });
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

exports.getMemberForm = asyncHander(async (req, res, next) => {
  res.render("member", { user: req.user });
});

exports.getAdminForm = asyncHander(async (req, res, next) => {
  res.render("adminForm", { user: req.user });
});

exports.postAdminForm = asyncHander(async (req, res, next) => {
  if (req.body.adminCode == "admin") {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.user._doc,
        admin: true,
      },
      {}
    );
    res.redirect(updatedUser.url);
  } else {
    res.render("adminForm", { user: req.user });
  }
});

exports.postMemberForm = asyncHander(async (req, res, next) => {
  const user = req.user;
  if (req.body.code == "password") {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...user._doc,
        membership: true,
      },
      {}
    );
    res.redirect(updatedUser.url);
  } else {
    res.render("member", { user: req.user });
  }
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

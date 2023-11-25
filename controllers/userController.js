const User = require("../models/users");
const asyncHander = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getUserForm = asyncHander(async (req, res, next) => {
  res.render("signUpForm");
});
exports.postUserForm = [];

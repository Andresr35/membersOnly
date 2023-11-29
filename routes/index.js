var express = require("express");
var router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});
router.get("/signUp", userController.getUserForm);
router.get("/logIn", userController.getLogIn);
router.get("/logOut", userController.getLogOut);
router.post("/logIn", userController.postLogIn);
router.post("/signUp", userController.postUserForm);

module.exports = router;

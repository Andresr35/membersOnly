var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/signUp", userController.getUserForm);

router.post("/signUp", userController.postUserForm);
module.exports = router;

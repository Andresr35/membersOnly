var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/member", userController.getMemberForm);
router.post("/member", userController.postMemberForm);
router.get("/:id", userController.getUserInfo);

module.exports = router;

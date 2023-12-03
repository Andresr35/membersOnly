var express = require("express");
var router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

/* GET home page. */
router.get("/", postController.getAllMessages);
router.get("/signUp", userController.getUserForm);
router.get("/logIn", userController.getLogIn);
router.get("/logOut", userController.getLogOut);
router.get("/messageForm", postController.getMessageForm);

router.post("/deletePost", postController.postDeletePost);
router.post("/messageForm", postController.postMessageForm);
router.post("/logIn", userController.postLogIn);
router.post("/signUp", userController.postUserForm);

module.exports = router;

const Post = require("../models/posts");
const asyncHander = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getMessageForm = asyncHander(async (req, res, next) => {
  res.render("messageForm", { user: req.user });
});

exports.postMessageForm = [
  body("message", "Must enter a message").trim().isLength({ min: 1 }).escape(),
  body("title", "Must enter title").trim().isLength({ min: 1 }).escape(),
  asyncHander(async (req, res, next) => {
    const allPosts = await Post.find({}).populate("user").exec();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("messageForm");
    } else {
      const post = new Post({
        user: req.user,
        message: req.body.message,
        title: req.body.title,
      });
      await post.save();
      res.render("index", {
        title: "Member Only Chat",
        user: req.user,
        posts: allPosts,
      });
    }
  }),
];

exports.getAllMessages = asyncHander(async (req, res, next) => {
  const allPosts = await Post.find({}).populate("user").exec();
  res.render("index", {
    title: "Member Only Chat",
    user: req.user,
    posts: allPosts,
  });
});

exports.postDeletePost = asyncHander(async (req, res, next) => {
  await Post.findByIdAndDelete(req.body.postID);
  res.redirect("/");
});

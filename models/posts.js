const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  message: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);

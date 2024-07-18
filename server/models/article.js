const mongoose = require("mongoose");
const Article = mongoose.model("Article", {
  title: { type: String },
  date: { type: Date },
  content: { type: String },
  image:{ type: String },
  author:{ type: mongoose.Schema.Types.ObjectId,
    ref: "User",},
  comments:[ [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]]
});
module.exports = Article;

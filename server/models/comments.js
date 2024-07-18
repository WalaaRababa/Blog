const mongoose = require("mongoose");
const Comment = mongoose.model("Comment", {
  comment: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
});
module.exports = Comment;
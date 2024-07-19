const Article = require("../models/article");
const Comment=require("../models/comments")
const getAllArticle = (req, res) => {
  Article.find({}).populate('author','comments').exec()
    .then((result) => {
      res.status(200).json({
        message: "all article",
        articles: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const getArticleById = (req, res) => {
  const { id } = req.params;
  Article.findById(id)
    .then((result) => {
      res.status(200).json({
        message: `article that has id =>${id}`,
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const getArticleByAuthorId = (req, res) => {
  const { id } = req.params;
  Article.find({ author: id })
    .then((result) => {
      if (result.length == 0) {
        res.status(200).json({
          message: `author that has id =>${id} no article for him yet`,
        });
      } else {
        res.status(200).json({
          message: `author that has id =>${id}`,
          articles: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const deleteArticleByID = (req, res) => {
  const { id } = req.params;
  Article.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: `article that has id =>${id} deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const createNewComment = (req, res) => {
  const {id} = req.params;
  console.log(id);
  const { comment } = req.body;
  const commenter = req.token.id;
  const newComment = new Comment({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      Article
        .updateOne({ _id: id }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const replyOnComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  const commenter = req.token.id;
  try {
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: "Parent comment not found",
      });
    }
    const reply = new Comment({
      comment,
      commenter,
      parentId: parentComment._id,
    });
    await reply.save();

    res.status(201).json({
      message: "Reply added",
      reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};
module.exports = {
  getArticleByAuthorId,
  getAllArticle,
  getArticleById,
  deleteArticleByID,
  createNewComment,
  replyOnComment
};

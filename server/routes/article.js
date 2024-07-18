const Article = require("../models/article");
const multer = require("multer");
const express = require("express");
const {
  getAllArticle,
  getArticleById,
  getArticleByAuthorId,
  createNewComment,
  replyOnComment,
} = require("../controllers/article");
const authentication = require("../middleware/authentication");
const articleRouter = express.Router();
let fileName = "";
const myStorage = multer.diskStorage({
  destination: "./uploads", 
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    fileName = fl;
  },
});
const upload = multer({ storage: myStorage });
articleRouter.post("/",upload.any('image') ,authentication,(req, res) => {
  let data = req.body;
  const article = new Article(data);
  article.date = new Date();
  article.image = fileName;
  article.author=req.token.id

  article
    .save()
    .then((result) => {
      console.log(fileName);
      fileName = "";
      res.status(201).json({
        message: "done",
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
});

articleRouter.put("/update/:id", upload.any("image"), (req, res) => {
  const { id } = req.params;
  let data = req.body;
  console.log(req.body);
  data.date = new Date();
  if (fileName.length > 0) {
    data.image = fileName;
  }
  Article.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((result) => {
      console.log(fileName);
      fileName = "";
      res.status(201).json({
        message: "done",
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
});
articleRouter.get("/", getAllArticle);
articleRouter.get("/:id", getArticleById);
articleRouter.get("/searchBy/:id", getArticleByAuthorId);
articleRouter.post("/:id/comments",authentication,createNewComment)
articleRouter.patch("/reply/comments/:commentId",authentication,replyOnComment)
module.exports = articleRouter;

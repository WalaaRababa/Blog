const express = require("express");
const { register, login, getUserById } = require("../controllers/user");
const UserRouter = express.Router();
UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/:id",getUserById);

module.exports = UserRouter;

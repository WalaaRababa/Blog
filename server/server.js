const express = require("express");
const UserRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const cors = require("cors");
const PORT = 5000 || process.env.PORT;
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
require("./models/db");

app.use("/user", UserRouter);
app.use("/article", articleRouter);
app.use("/image", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DBUrl)
  .then(() => {
    console.log(`db connect!`);
  })
  .catch((err) => {
    console.log(err);
  });
module.exports=mongoose
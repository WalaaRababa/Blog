const mongoose = require("mongoose");
const User = mongoose.model("User", {
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
});
module.exports = User;

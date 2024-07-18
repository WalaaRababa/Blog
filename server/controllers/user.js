const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(req.body.password, salt);
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "done",
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const login=async(req, res) => {
    const data = req.body;
    try {
      const result = await User.findOne({ email: data.email });
      if (result === null) {
        res.status(404).json({
          message: "email or password doesn't match ",
        });
      } else {
        const valid = bcrypt.compareSync(data.password, result.password);
        if (!valid) {
          res.status(404).json({
            message: "email or password doesn't match ",
          });
        } else {
          const payload = {
            id: result._id,
            name: result.firstName,
          };
          const options = {
            expiresIn: "5h",
          };
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json(
            token
          );
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "server error",
        error: error,
      });
    }
  }

module.exports={register,login}

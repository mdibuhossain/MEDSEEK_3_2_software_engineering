const User = require("../models/userModel");

const logIn = async (req, res) => {
  try {
    const checkUser = await User.find({ email: req.body.email });
    console.log(checkUser);
    if (checkUser && checkUser.length > 0) {
      res.status(200).json({
        message: "Login successful.",
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message.split(": ")[2].split(",")[0],
    });
  }
};

const signUp = (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      hashPassword: req.body.hashPassword,
    });
    newUser
      .save()
      .then(() => {
        res.status(200).json({
          message: "Signup successful.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message.split(": ")[2].split(",")[0],
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { logIn, signUp };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const logIn = async (req, res) => {
  try {
    const checkUser = await User.find({ email: req.body.email });
    if (checkUser[0] && checkUser.length > 0) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        checkUser[0].hashedPassword
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            uid: checkUser[0]._id,
            name: checkUser[0].name,
            email: checkUser[0].email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        res.status(200).json({
          token: `Bearer ${token}`,
          message: "Login successful.",
        });
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        });
      }
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

const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT)
    );
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      hashedPassword: hashedPassword,
      salt: Number(process.env.SALT),
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

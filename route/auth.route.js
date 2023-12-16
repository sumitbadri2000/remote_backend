const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { AuthModel } = require("../model/auth.module.js");
const AuthRouter = express.Router();

AuthRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await AuthModel.find({ email });

  if (user.length === 0) {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: "Something Went Wrong" });
      } else {
        try {
          const newUser = new AuthModel({
            name,

            email,
            password: hash,
          });
          await newUser.save();
          res.status(200).send({ msg: "User Registration Suceessful" });
        } catch (e) {
          res.status(201).send({ msg: "Something Went Wrong" });
        }
      }
    });
  } else {
    res.status(200).send({ msg: "User already exist, Please login" });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthModel.find({ email });

  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, async (err, result) => {
      if (result) {
        try {
          const token = jwt.sign(
            { userID: user[0]._id },
            process.env.userSecretKey
          );
          res.status(200).send({ msg: "Login Suceessful", token: token });
        } catch (e) {
          res.status(400).send({ msg: "Wrong Credentials", err: e.message });
        }
      } else {
        res
          .status(201)
          .send({ msg: "Something Went Wrong", error: "Wrong Password" });
      }
    });
  } else {
    res
      .status(200)
      .send({ msg: "User is not registered,Please register first" });
  }
});

module.exports = { AuthRouter };

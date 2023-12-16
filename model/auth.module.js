const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    versionKey: false,
  }
);

const AuthModel = mongoose.model("auth", AuthSchema);

module.exports = { AuthModel };

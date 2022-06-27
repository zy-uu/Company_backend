const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    phone: {type: Number, default: null},
    name:  {type: String, default: null},
    company1: {type: String, default: null},
  })
);
module.exports = User;
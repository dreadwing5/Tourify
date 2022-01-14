const mongoose = require("mongoose");
const validator = require("validator");
const { encrypt, compare } = require("../utils/passwordHelper");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a vaild email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Password do not match!",
    },
  },
});

userSchema.pre("save", async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  //Hash the password

  this.password = await encrypt(this.password);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined; //This is to prevent saving the passwordConfirm to the database
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

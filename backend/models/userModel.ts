import mongoose from "mongoose";
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an Email"],
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [8, "Password should have more than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
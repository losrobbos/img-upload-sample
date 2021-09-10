const mongoose = require("mongoose")
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image_url: { type: String }
})

const User = model("User", UserSchema)

module.exports = User

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: {
      type: String,
      // unique: true
    },
    password: {
      type: String,
      minLength: 8
    },
    location:String,
    gender: String,
    age: Number,
  })

const userModel = mongoose.model('user',userSchema)

module.exports = {userModel}
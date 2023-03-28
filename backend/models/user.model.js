const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      minLength: 8
    },
    location: String,
    gender: String,
    phoneNumber: {
      type: Number,
      minimum: 1000000000,
      maximum: 9999999999
    }
  })
const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    name: {
      type:String,
      required:true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minLength: 8,
      required: true
    }
  })

const AdminModel = mongoose.model('user',AdminSchema)

module.exports = {AdminModel}
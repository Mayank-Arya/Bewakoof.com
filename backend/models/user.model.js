const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    },
    location:{
      type:String,
      required: true
    },
    gender: {
      type: String,
      required:true
    },
    age:{
      type:Number,
      required: true
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },{
    timestamps:true
  })

const userModel = mongoose.model('user',userSchema)

module.exports = {userModel}








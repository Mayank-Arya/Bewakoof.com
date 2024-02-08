const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    Image:String,
    price:Number,
    category:String,
    type:String,
    brand:String
  },{
    versionKey:false
  })

const productmodel = mongoose.model('product',productSchema)

module.exports = {productmodel}









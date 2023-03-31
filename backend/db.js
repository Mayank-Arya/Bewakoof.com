const mongoose = require('mongoose')
require('dotenv').config()

const connnection = mongoose.connect(process.env.mongoURL)

module.exports = {connnection}
 
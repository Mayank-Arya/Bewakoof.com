const express = require('express')
const {connection} = require('./db')
const {userRouter} = require('./routes/user.routes') 
const {productRouter} = require('./routes/product.routes')
const {auth} = require("./middlewares/auth.middleware")
const cors = require("cors")
const app = express()
app.use(express.json())

app.use(cors())
app.use("/users",userRouter)
// auth middlewares
app.use("/products",productRouter)
// app.use(auth)

app.listen(process.env.port,async ()=>{
    await connection
    console.log('server is running at port',process.env.port)
})

// 

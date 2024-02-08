const express = require('express')
const {connection} = require('./db')
const {userRouter} = require('./routes/user.routes') 
const {productRouter} = require('./routes/product.routes')
require('dotenv').config()
const {auth} = require("./middlewares/auth.middleware")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello EveryOne")
})

app.use("/users",userRouter)
// auth middlewares

app.use("/products",productRouter)
// app.use(auth)

app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("Conectoed to DB")
    }
    catch(err){
        console.log(err.message)
    }
    console.log('server is running at port',process.env.port)
})













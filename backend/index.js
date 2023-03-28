const express = require('express')

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("HOME PAGE")
})


app.listen(9090,()=>{
    console.log("This Server Is Running At Port 9090")
})
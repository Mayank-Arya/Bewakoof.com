
const express = require('express')
const userRouter = express.Router()
const {userModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
// const cors = require(cors())

//registration
userRouter.post('/register',async(req,res)=>{
    const {name,email,password,location,gender,age} = req.body
try{
    bcrypt.hash(password,5,async (err,hash)=>{
   const user = new userModel({name,email,password:hash,location,gender,age})
   await user.save()
   res.status(200).send({"msg":"Register Successful"})
    })
}
catch(err){
res.status(400).send({msg:err.message, req:false})
return
}

})


//login
userRouter.post('/login',async (req,res)=>{
    const {email,password}= req.body
    try{
        const user = await userModel.findOne({email})
        console.log(user)
        if(user){
        //If this condition got true then=>
        // Load hash from your password DB.
    bcrypt.compare(password,user.password,(err, result)=>{
    // result == true
    if(result){
        res.status(200).send({"msg":"Login Successful","token":jwt.sign({"userID": user._id},'project',),"username":user.name , 'req':true})
    }else{
        res.status(400).send({'msg':"Login Failed"})
    }
        })
    }
}
    catch(err){
        res.status(400).send({'msg':"Login Failed",req:false})
        }
    })

module.exports = {userRouter}


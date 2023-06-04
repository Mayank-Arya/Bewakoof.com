
const express = require('express')
const userRouter = express.Router()
const {userModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const cors = require('cors')
userRouter.use(cors())
//registration
userRouter.post('/register',async(req,res)=>{
    const {name,email,password,location,gender,age} = req.body
try{
    let isUserPresent = await userModel.findOne({email:email})
    if(isUserPresent){
        res.status(400).send({msg:"User already exists! Please log in."})
    }
   if(!isUserPresent){
    bcrypt.hash(password,5,async (err,hash)=>{
        const user = new userModel({name,email,password:hash,location,gender,age})
        await user.save()
        res.status(200).send({"msg":"Register Successful"})
         })
   }
}
catch(err){
res.status(400).send({msg:err.message, req:false})
return
}

})


//login

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            // Handle bcrypt error
            res.status(500).send({ msg: 'Internal Server Error' });
          } else if (result) {
            // Password matches, generate and send JWT token
            const token = jwt.sign({ userID: user._id }, 'project');
            res.status(200).send({ msg: 'Login Successful', token, username: user.name, req: true });
          } else {
            // Password does not match
            res.status(401).send({ msg: 'Login Failed' });
          }
        });
      } else {
        // User not found
        res.status(404).send({ msg: 'User not found' });
      }
    } catch (err) {
      // Handle other errors
      res.status(500).send({ msg: 'Internal Server Error' });
    }
  });

module.exports = {userRouter}


const jwt = require('jsonwebtoken')
//This middleware will help us in authenticating the routes 
//That after login, the user can access the routes and implement the actions
const auth = (req,res,next)=>{
  //logic
  const token = req.headers.authorization    //We'll get the token from the headers
  if(token){
   const decoded = jwt.verify(token,'stark')
   if(decoded){
    req.body.userID = decoded.userID
    next()
   }else{
    res.status(400).send({"msg":"Please login first!"})
   }
  }else{
    res.status(400).send({"msg":"Please login first!"})
  }
}

module.exports = {auth}
















const express= require('express')
const productRouter=express.Router()
const {productmodel}=require("../models/product.model")
const {auth} = require('../middlewares/auth.middleware')

productRouter.get("/",async(req,res)=>{
    const query = req.query
    try{
        const data=await productmodel.find(query)
        res.send(data)
    }catch(err){
        res.send(err.message)
    }
})

productRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const name=req.body.name
    try{
         const data = await productmodel.findOne({name:name})
         if(data){
            res.send({"msg":"Product available already"})
        }else{
        const product=new productmodel(payload)
        await product.save()
        res.send({"msg":"New product has been registered"})
        }
    }catch(err){
        res.send({"err":err.message})
    }
})

productRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await productmodel.findByIdAndDelete({_id:id})
        res.send({"msg":`Products with this id:${id} has been deleted`})
    }catch(err){
        res.send({"msg":"Error deleting products"})
    }
})

productRouter.patch("/patch/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try{
        await productmodel.findByIdAndUpdate({_id:id},data)
        res.send({"msg":`Products with this id:${id} has been Updated`})
    }catch(err){
        res.send({"msg":"Error updating products"})
    }
})



productRouter.get("/sort", async (req, res) => {
    const { name, category, sortBy } = req.query;
    const filter = {};
  
    if (name) {
      filter.name = name;
    }
  
    if (category) {
      filter.category = category;
    }
  
    try {
      let data;
  
      if (sortBy) {
        // If sortBy is specified, use it for sorting
        data = await productmodel.find(filter).sort(sortBy);
      } else {
        // If sortBy is not specified, fetch data without sorting
        data = await productmodel.find(filter);
      }
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
    }
  });




module.exports={productRouter}


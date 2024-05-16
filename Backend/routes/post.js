import express from "express";
import { create } from "../models/post.js";
const createRouter = express.Router();
import { applyMiddleWare } from "../middleware/auth.js";
// import multer from "multer";
import { upload } from "../middleware/filleUpload.js";
import { modelNames } from "mongoose";
import moment from "moment";


createRouter.post("/createpost",applyMiddleWare,upload.single("image"), async (req, res) => {
  try {
    const { title, description , postedby} = req.body;
    const image=req.file.path;
    
    if (!title || !description || !image ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const Create = new create({
      user:req.user,
      title,
      description,
      image,
      created_Date:new Date(),
      liked:false,
      comments:[],
      
    })
    await Create.save();
    res.status(201).json({ message: "Post Created Sucessuflly" });
  } catch (err) {
    console.log(err);
  }
});

createRouter.get("/createpost",applyMiddleWare,async(req,res)=>{
  try{
    const userId=req.user;
      const Create = await create.find({user:userId})
      res.json(Create)
  }
  catch(error){
      console.log(error)
  }
})

createRouter.get("/createpost/:id",async(req,res)=>{ 
  try{
      const id = req.params.id
      const Create = await create.findById(id)
      res.json(Create)
  }
  catch(error){
      console.log(error)
  }
})

createRouter.put("/createpost/:id", async (req, res) => {
  const id = req.params.id
  const { title , description,image } = req.body;
  if(!description || !image || !title  ){
    res.status(400).json({message:"all fields are required"})
  }
  else if (!title){
    res.status(400).json({message:"title is required"})
  }
  else if (!description){
    res.status(400).json({message:"description is required"})
  }
  else if (!image){
    res.status(400).json({message:"image is required"})
  }
  else {
    try{
      const updateCreate= await create.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image,
          created_Date: new Date()
        },
        { new:true }
      )
      res.json(updateCreate)
    }catch(error){
      console.log(error)
    }  
  }
})

createRouter.delete("/createpost/:id",async(req,res)=>{
  try{
    const id = req.params.id
    const deleteCreate= await create.findByIdAndDelete(id)
    res.json({message:"Post delete sucessfully"})
  }catch(error){
    console.log(error,"asdfgbnm")
  }
})

// PATCH FOR LIKE AND UNLIKE
 
createRouter.patch("/update/:id",async (req,res)=>{
  try{
    const id= req.params.id
    const update= req.body
     const updateCreate= await create.findByIdAndUpdate(id,update,{
      new:true
     })
     res.json(updateCreate)
  }catch(err){
    console.log(err)
  }
})

// COMMENTS

createRouter.post("/createpost/:id/comment", async (req, res) => {
  const id = req.params.id
  const {comment} = req.body;
  try {
    const  CreateComment= await create.findById(id)
    if(!CreateComment){
      return res.status(404).json({message:"Comment Not Found"})
    }
    CreateComment.comments.push({comment})
    await CreateComment.save()
    res.status(201).json(CreateComment)
  }catch(err){
    console.log(err,"this is err")
  }  

});
// DELETE COMMENTS

createRouter.delete("/createpost/:id/comment/:commentId", async (req, res) => {
  const id = req.params.id
  const commentId = req.params.commentId;
  try {
    const  CreateComment= await create.findById(id)
    if(!CreateComment){
      return res.status(404).json({message:"Comment Not Found"})
    }
    CreateComment.comments.pull(commentId)
    await CreateComment.save()
    res.status(201).json(CreateComment.comments)
  }catch(err){
    console.log(err,"this is err")
  }  

});

// FILTER

createRouter.get("/filter",async(req,res)=>{
  try{
    const{title,created_Date}=req.query
    let query={}
    if(title)
    {query.title=title}
    if(created_Date){
      const startofDay= moment(created_Date).startOf("day").toDate()
      const endofDay= moment(created_Date).endOf("day").toDate()
      query.created_Date={$gte:startofDay,$lte:endofDay}
    }
    const Create = await create.find(query)
    res.json(Create)
  }catch(err){
    console.log(err,"swerfghn")
    res.status(500).json({message:"internal server error"})
  }
})

// SEARCH API

createRouter.get("/search",async(req,res)=>{
  try{
    const {searchtext}= req.query
  if(!searchtext){
    return res.json([])
  }
  const searchResults= await create.find({
    title:{ $regex : searchtext,$options:"i"},
  })
  res.json(searchResults)
  }catch(err){
    console.log(err,"error search blog")
    res.status(500).json({error:"internal server error"})
  }
})


export default createRouter;

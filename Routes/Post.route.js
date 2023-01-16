const express=require("express");
const { PostModel } = require("../Models/Post.model");

const PostRouter=express.Router();

PostRouter.get("/",async (req,res)=>{
    // res.send("Posts")
    const device=req.query.device;
    console.log(typeof( device))
    console.log(device)
    try{
        if(device!=undefined&&typeof(device)=="string"){
            const post=await PostModel.find({device});
            res.send(post);
        }else if(device!=undefined&&device.length>0&&typeof(device)=="object"){
            let arr=[];
            for(let i=0;i<device.length;i++){
                const post1=await PostModel.find({device:device[i]});
                arr.push(post1);
            }

            res.send(arr);
        }else{
            const post=await PostModel.find();
            res.send(post);

        }
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

PostRouter.post("/add",async (req,res)=>{
    const data=req.body;
    try{
       const post=new PostModel(data);
       post.save();
        res.send("Added Successfully")
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

PostRouter.patch("/update/:id",async (req,res)=>{
    const data=req.body;
    const id=req.params.id
    // console.log(id)
    try{
        await PostModel.findByIdAndUpdate({_id:id},data);
        res.send("Updated One Post with id "+id);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

PostRouter.delete("/delete/:id",async (req,res)=>{
    // const data=req.body;
    const id=req.params.id
    // console.log(id)
    try{
        await PostModel.findByIdAndDelete({_id:id});
        res.send("Deleted One Post with id "+id);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})


module.exports={PostRouter};
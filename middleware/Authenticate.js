const express=require("express");
require("dotenv").config();
const jwt=require("jsonwebtoken")

const authenticate=async (req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token)
    try{
        if(token){
            jwt.verify(token, process.env.key,(err,decoded)=>{
                // console.log(decoded);
                next();
            })
        }else{
            res.send("Please Login First")
        }
    }catch(err){
        res.send("Please Login First")
        console.log("Something went wrong while verifying");
    }
}

module.exports={authenticate};
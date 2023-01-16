const express=require("express");
const { UserModel } = require("../Models/Users.model");

const jwt=require("jsonwebtoken");

const bcrypt = require('bcrypt');

require("dotenv").config();

const UserRouter=express.Router();

UserRouter.use(express.json());

UserRouter.get("/",(req,res)=>{
    res.send("Users");
})

UserRouter.post("/register",async (req,res)=>{
    const {name,email,gender,password}=req.body;
    try{
         await bcrypt.hash(password, 5, (err,result)=>{
            if(result){
                // console.log(result)
                 
                 const user=new UserModel({name,email,gender,password:result});
                 user.save();
                 res.send("Registered Successfully")
            }else{
                console.log("Something went wrong while creating password hash")
            }
        });
        // console.log(hashpass)
    }catch(err){
        res.send("Something went wrong");
        console.log(err)
    }
})

UserRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await UserModel.find({email});
        let hash=user[0].password;
        console.log(hash)
        console.log(user)
        if(user.length>0){
            var token = jwt.sign({ UserID: user[0]._id },process.env.key);
    
            // console.log(token)
            bcrypt.compare(password, hash, (err,result)=>{
                console.log(result,hash)
                if(result){
                    res.send({"msg":"Login Successfully","token":token})
                }else{
                    res.send("Password is Wrong");
                }
            });
        }else{
            res.send("Email Or Password is invalid")
        }
    }catch(err){
        res.send("Something went wrong");
        console.log(err)
    }
})

module.exports={UserRouter};
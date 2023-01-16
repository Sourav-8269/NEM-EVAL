const express=require("express");
const { connection } = require("./config/db");

const cors=require("cors");


require("dotenv").config();

const app=express();

app.use(cors());
const {authenticate} =require("./middleware/Authenticate")

app.use(express.json());

const {UserRouter} =require("./Routes/User.route")

const {PostRouter} =require("./Routes/Post.route")

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",UserRouter);

app.use(authenticate);

app.use("/posts",PostRouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }catch(err){
        console.log("Something Went Wrong");
        console.log(err)
    }
})
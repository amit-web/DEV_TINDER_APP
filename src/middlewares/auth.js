
const express = require("express");
const app = express();

const adminAuthMiddleware = (req,res,next)=>{
    console.log("Admin Auth is getting called");
    const token = "xyz";
    const isAdminAuthorized = token ==="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Invalid request  of admin")
    }
    else{
      next(); 
    }
}
const userAuthMiddleware = (req,res,next)=>{
    console.log("user Auth is getting called");
    const token = "xyz";
    const isAdminAuthorized = token ==="xyzk"
    if(!isAdminAuthorized){
        res.status(401).send("Invalid request  for user")
    }
    else{
      next(); 
    }
}


module.exports={
    adminAuthMiddleware,
    userAuthMiddleware
}
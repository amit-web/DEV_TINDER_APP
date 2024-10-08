
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
// const userAuthMiddleware = (req,res,next)=>{
//     console.log("user Auth is getting called");
//     const token = "xyz";
//     const isAdminAuthorized = token ==="xyzk"
//     if(!isAdminAuthorized){
//         res.status(401).send("Invalid request  for user")
//     }
//     else{
//       next(); 
//     }
// }

const userAuth = async(req,res,next)=>{
 try{
      //Verifying the token !!
      const {token} = req.cookies;
      if(!token){
        return res.status(401).send("please Login")
      }
      //verify the jwt token 
      const decodeMessageObj = await jwt.verify(token,"devTinder9334");
      const {_id} = decodeMessageObj;
  
      const user = await User.findById(_id);
  
      if(!user){
          throw new Error("Invalid user!!!")
      }
      req.user=user;
      next();
 }
 catch(err){
   res.status(400).send("Error:"+" "+err.message);
 }
}

module.exports={
    adminAuthMiddleware,
    userAuth
}
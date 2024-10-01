const express = require('express');
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const connectionRequest  = require("../models/connectionRequest");
const safeData = ["firstName","lastName","age","gender","age","skills","about"]

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
     console.log("amit")
    try{
       //trying to fetch all the intrested connection request  of the particular user;

       loggedInUser = req.user;
       connectionRequest
       //filtering the data from database 

      const data = await connectionRequest.find({
            toUserId : loggedInUser._id,
            status:"intrested"
      }).populate("fromUserId",safeData)

      //.populate("fromUserId","firstName","lastName")

    //console.log(data)
      res.json({
        message:"Got the intrested data",
        data
      })


    }
    catch(err){
        res.status(400).send("Error:"+" "+err.message)
    }

})



userRouter.get("/user/connections",userAuth,async(req,res)=>{
   try{
    loggedInUser = req.user;
    const connectionReq = await connectionRequest.find({
          status:"accepted",
          $or:[
            {toUserId:loggedInUser._id},
            {fromUserId:loggedInUser._id}
          ]
    }).populate("fromUserId",safeData).populate("toUserId",safeData);
console.log(connectionReq);
 const data = connectionReq.map((row)=>{
    if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.totoUserId
    }
    return row.fromUserId;
 })

    res.json({data});
   }
   catch(err){
      res.status(400).send("Error:"+" "+err.message);
   }

})


module.exports = userRouter;


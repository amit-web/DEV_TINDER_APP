const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const user = require('../models/user');
const connectionReq = require("../models/connectionRequest")
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      console.log("sending connction to the user");
  
      const user = req.user;
      res.send("Connection request sent by:" + " " + user.firstName);
    } catch (err) {
      res.status(400).send("Failed to sent request");
    }
  });


  requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
      //get the data of user , user is logged in and want to send the connection request;
      //Whom he need to send the request you are getting the id of that user from params
      const fromUserId = req.user._id;
      console.log(fromUserId)
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      let allowedStatus = ["ignored","intrested"];
      if(!allowedStatus.includes(status)){
         return res.status(400).send("Invalid request")
      }
   
      //User is in your db or not?
      const findUserInDB = await user.findById(toUserId)
      if(!findUserInDB){
        return res.status(400).send("USer not Found!!!");
      }
      
      const existingConnectionRequest = await connectionReq.findOne({
        $or:[
          {fromUserId,toUserId},
          {fromUserId:toUserId,toUserId:fromUserId}
        ]
      })
      
      if(existingConnectionRequest){
        return res.status(400).send({message:"Connection Request Already exist"})
      }

     const connectionRequest = new connectionReq({
      fromUserId,
      toUserId,
      status
     })

     const data = await connectionRequest.save();
     res.json({
      message:req.user.firstName + " " + status+ " "+ "in"+ " "+findUserInDB.firstName,
      data
     })

    }
    catch(err){
      res.status(400).send("Error: "+" "+err.message);
    }

  })

module.exports = requestRouter;
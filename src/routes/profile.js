const express = require('express');
const bcrypt = require("bcrypt");
const {validatePassword} = require("../models/user")
const validator = require("validator");


const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation")


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("Error:" + " " + err.message);
    }
  });
  

  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
         //getting the user from the data finding by id;

         //We need to edit the data so we can get the data which we need to updated from the postman ;

         //will match the key of the data which we are getting from the postman and after that

         //will update those data and update it into the existing data:
       const validation = validateEditProfileData(req);
       if(!validation){
          throw new Error("Invalid request")
       }
     const loggedInUser = req.user; 
     const userDataNeedToUpdate = req.body;  
          
    Object.keys(userDataNeedToUpdate).forEach((key)=>{
      return loggedInUser[key] = userDataNeedToUpdate[key]
    })
    await loggedInUser.save();
     res.json({
      message:`${loggedInUser.firstName} your profile updated successfully`,
      data:loggedInUser
     });
    }
    catch(err){
      res.status(400).send("Error:"+" "+err.message);
    }
  })
  profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
      //As we know user will authenticate then only it will happen:--->
      //we are getting old password and new password of the user:--->
      //for old password we are matching 
      //He will give normal password and we need todo decryption of the password;
      //will match after that if password will match then 
      //we will check wheather password is strong or not 
      //after that will update the password with new password
      //and succesfull text message will return:
      const passwordData = req.body;
     const {password,newpassword} = passwordData;
      //console.log(passwordData)
      const user = req.user;
      console.log(user);
      const validatingOldPassword = await user.validatePassword(password);

     console.log(validatingOldPassword);
     if(!validatingOldPassword){
      throw new Error("Invalid password");
     }
     else if(!validator.isStrongPassword(newpassword)){
      throw new Error("Use strong password!!");
     }
     user.password = await bcrypt.hash(newpassword,10);
     await user.save();
     res.json({
      message:`${user.firstName} your password updated successfully`,
      data:user
     });
    }catch(err){
      res.status(400).send("Error:"+" "+err.message)
    }
  })
  module.exports = profileRouter;
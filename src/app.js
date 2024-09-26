const express = require("express");

const app = express();

const {adminAuthMiddleware,userAuthMiddleware}  = require("./middlewares/auth");

app.use("/admin",adminAuthMiddleware);

//Route of order matters:--->
// app.use("/",(err,req,res,next)=>{
//   console.log("it is getting called after we are getting error in try catch block")
//   if(err){
//     res.status(500).send("Something went Wrong");
//   }
   
// });
app.get("/user",userAuthMiddleware,(req,res)=>{
  res.send("user data sent")
});
app.get("/user/getAllUserData",(req,res)=>{
    //Here if we are written some logic and getting error so how we can handle it gracefully
   try{
     // logic of  db call and get userdata
      throw new Error("Error is throwing for test");
      res.send("user data send")

   }
    catch(err){
        res.status(500).send("some Error contact support team");
    }
})

 //("/") Wild card match, it will check all route 



 //This will need to write on the last so that it will catch  the errors;
 //
app.use("/",(err,req,res,next)=>{
  //now what happens when we use this wild card route to the top and comment this one :--->
     if(err){
      res.status(500).send("something Went wrong")
     }
})

app.listen(7777, () => {
  console.log("Server is successfully listenig on port 7777");
});

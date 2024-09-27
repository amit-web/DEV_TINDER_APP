const express = require("express");
const {connectDB} = require("./config/database.js");
const User = require("./models/user")
const app = express();

//Using Express.json to convert the Json data which we receving and convertig it into object;
app.use(express.json());

app.post("/signup",async (req,res)=>{
  //Creating a new instance of the user model:-->
  const user = new User(req.body)
// Any database operation,so we need to handle this inside try/catch;
try{
  await user.save();
  res.send("user added successfully");
}
catch(err){
  res.status(404).send("Couldn't create user"+""+err.message)
}     
})
-// get all the users from the database
//Feed Api ---> GET /feed 
// app.get("/feed",async(req,res)=>{
//    // logic to fetch the users from the database and send it back to the client
//    let userEmailId = req.body.emailId;
//    try{
//     const findOneWithEmail = await User.findOne({emailId:userEmailId});
//     res.send(findOneWithEmail);
//    }
//    catch(err){
//      console.log("users data not found"+err.message);
//      res.status(400).send("user not found")
//    }
  
// })

// Get user by EmailId:---->

// app.get("/feed",async(req,res)=>{
//     let userEmailId = req.body.emailId;
//     try{
//       const findWithEmail = await User.find({emailId:userEmailId})
//       if(findWithEmail.length!=0){
//         res.send(findWithEmail);
//       }
//       else{
//         res.status(400).send("user not found")
//       }
//     }
//       catch(err){
//         console.log("USer not found"+err.message);
       
//       }
// })

//Get auser by ID

// app.get("/feed",async(req,res)=>{
//   let getUSerId = req.body._id;
//     try{
//         const userFindbyId = await User.findById({_id:getUSerId})
//         if(userFindbyId){
//           res.send(userFindbyId);
//         }
//         else{
//           res.status(400).send("user not found")
//         }
      
//     }
//     catch(err){
//        console.log("user not found"+""+err.message)
     
//     }
// })

//Delete a user :--->

// app.delete("/user",async(req,res)=>{
//   let userId = req.body.userId;
//   try {
//     const userdata = await User.findByIdAndDelete({_id:userId},{returnDocument:'before'});
//     console.log(userdata);
//      res.send("User deleted sucessfully");
//   } catch (error) {
//     res.status(400).send("Something Went Wrong!!")
//   }
// })

//Patch req.

// app.patch("/user/:userId",async(req,res)=>{ 
//   try{
//     //const userId = req.body.userId;
//     let userdata = req.body;
//     let userId = req.params.userId

//     //Api level data validation , we want to update the data which we have in below array;
//     let usercanUpdate = ["userId","firstName","password","age","gender","skills","about"];

//     let willUpdateValidation = Object.keys(userdata).every((k)=>{
//          return  usercanUpdate.includes(k);
//     })
//     if(!willUpdateValidation){
//       throw new Error("Can't update this data!!")
//     }
//     const beforeUserUpdate = await User.findByIdAndUpdate(userId,userdata,{runValidators:true},{returnDocument:'after'})
//     //console.log(beforeUserUpdate);
//     res.send("User updated sucessfully")
//   }catch(err){
//      res.status(400).send("Something Went wrong!!!"+""+err.message);
//   }

// })

//Find one and Update:---->

// app.patch("/user",async(req,res)=>{

//   try{
//     const name = req.body.firstName;
//     const query = {
//       firstName:"sunny singh"
//     } 
//       await User.findOneAndUpdate(query,{firstName:"roman"})
//       res.send("Data successfully updated!!!")
//   }
//   catch(err){
//       res.status(400).send("Something Went wrong!!!");
//   }
// })

//Get user by email :--->

// app.get("/user",async(req,res)=>{
//   try{
//     const email = req.body.emailId;
//     const userdata = await User.findOne({emailId:email})
//     console.log(userdata);
//       res.send("successfully Got the Data")
//   }
//   catch(err){
//       res.status(400).send("Something Went wrong!!!");
//   }
// })


connectDB().then(()=>{
  console.log("Database connected successfully!!!")
  app.listen(7777, () => {
    console.log("Server is successfully listenig on port 7777");
  });
})
.catch((err)=>{
  console.log("Database is not connected")
})






const express = require('express');

const app = express();

//request handle


app.get("/a(bc)?d",(req,res)=>{
    //like this we can get query parameter:--->  
    console.log(req.query)
    res.send({firstName:"Amit",lastName:"Mehta"});
});
app.get("/ab+cd",(req,res)=>{
    //like this we can get query parameter:--->  
    console.log(req.query)
    res.send({firstName:"Amit",lastName:"Mehta"});
});
app.get("/ab*cd",(req,res)=>{
    //like this we can get query parameter:--->  
    console.log(req.query)
    res.send({firstName:"Amit",lastName:"Mehta"});
});
// app.get("/ab?c",(req,res)=>{
//     //like this we can get query parameter:--->  
//     console.log(req.query)
//     res.send({firstName:"Amit",lastName:"Mehta"});
// });

//dynamic route
// app.get("/user/:userId/:name/:password",(req,res)=>{
//     //like this we can get query parameter:--->  
//     console.log(req.params)
//     res.send({firstName:"Amit",lastName:"Mehta"});
// });

// app.use("/user",(req,res)=>{

//    //Route handler callback function
//    //res.send("request handler 1");
//    //if we have not send anything from response then it will be handing there itself while we are requesting:--->(request is hanging)

// })
//As many as we want to pass the request handler we can pass one after another using next;

//we cn also pass [rH,rH2,rH3,rH4,rH5];

// app.use("/user", (req, res, next) => {
//   console.log("1 request handler");
//   //res.send("request handler 1");
//   //next();
// },
// (req,res,next)=>{
//     console.log("2 request handler");
//     //res.send("request handler 2");
//     next()
// },
// (req,res,next)=>{
//     console.log("3 request handler");
//    // res.send("request handler 3");
//     next()
// },
// (req,res,next)=>{
//     console.log("4 request handler");
//    // res.send("request handler 4");
//     next()
// }
// );

/ get all the users from the database
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

  //Get a user by ID

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

app.post("/user/login",(req,res)=>{
    res.send("user logged in succesfully")
  })
  
  app.get("/admin",(req,res,next)=>{
    res.send("Adimin is Authorized");
  })
  
  app.get("/admin/getAllData",(req,res)=>{
    res.send("All data sent");
  })
  
  app.get("/admin/deleteUser",(req,res,next)=>{
    res.send("Deleted a user")
  })


  //Here error handling and middleware examples:

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



app.listen(7777,()=>{
    console.log('Server is successfully listenig on port 7777');
});



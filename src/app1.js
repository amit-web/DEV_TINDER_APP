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



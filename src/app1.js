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


app.listen(7777,()=>{
    console.log('Server is successfully listenig on port 7777');
});



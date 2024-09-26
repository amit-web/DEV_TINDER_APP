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




app.listen(7777,()=>{
    console.log('Server is successfully listenig on port 7777');
});



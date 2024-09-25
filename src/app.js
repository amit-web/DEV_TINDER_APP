const express = require('express');

const app = express();

//request handle

app.use("/test",(req,res)=>{
    res.send("Hello from the server!!!")
})
app.use("/",(req,res)=>{
    res.send("I have install the nodemon to run the server!!!")
})
app.use("/hello",(req,res)=>{
    res.send("Hello Hello Hello!!!")
})

app.listen(7777,()=>{
    console.log('Server is successfully listenig on port 7777');
});



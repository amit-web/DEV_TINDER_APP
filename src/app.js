const express = require('express');

const app = express();

//request handle


app.get("/user",(req,res)=>{
    res.send({firstName:"Amit",lastName:"Mehta"});
});

app.post("/user",(req,res)=>{
    res.send("send post data succesfully")
})

app.delete("/user",(req,res)=>{
    res.send("data deleted sucessfully");
});

app.use("/user",(req,res)=>{
    res.send("hahahahahhaha")
})


app.listen(7777,()=>{
    console.log('Server is successfully listenig on port 7777');
});



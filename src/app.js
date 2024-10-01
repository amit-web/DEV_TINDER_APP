const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");

//Reading the cookies data after getting from server using cookieParser
app.use(cookieParser());
//Using Express.json to convert the Json data which we receving and convertig it into object;
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter =  require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)



connectDB()
  .then(() => {
    console.log("Database connected successfully!!!");
    app.listen(7777, () => {
      console.log("Server is successfully listenig on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database is not connected");
  });

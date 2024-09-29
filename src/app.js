const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user");
const app = express();
const { userValidationSignup } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

//Reading the cookies data after getting from server using cookieParser
app.use(cookieParser());

//Using Express.json to convert the Json data which we receving and convertig it into object;
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Any database operation,so we need to handle this inside try/catch;

  try {
    //Creating a new instance of the user model:-->

    let data = req.body;
    let { firstName, lastName, emailId, password } = req.body;
    //validation of data
    userValidationSignup(data);

    //Encrypt of password
    const hashEncrptedPassword = bcrypt.hash(password, 10);
    const hasedPass = await hashEncrptedPassword;
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hasedPass,
    });

    // console.log(hasedPass);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(404).send("Error:" + " " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    let { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create jwt token
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });

      res.send("Login successful");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("Error:" + " " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + " " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("sending connction to the user");

    const user = req.user;
    res.send("Connection request sent by:" + " " + user.firstName);
  } catch (err) {
    res.status(400).send("Failed to sent request");
  }
});

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

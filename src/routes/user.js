const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const safeData = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "age",
  "skills",
  "about",
  "photoUrl"
];
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    //trying to fetch all the intrested connection request  of the particular user;

    loggedInUser = req.user;
    connectionRequest;
    //filtering the data from database

    const data = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "intrested",
      })
      .populate("fromUserId", safeData);

    //.populate("fromUserId","firstName","lastName")

    //console.log(data)
    res.json({
      message: "Got the intrested data",
      data,
    });
  } catch (err) {
    res.status(400).send("Error:" + " " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    loggedInUser = req.user;
    const connectionReq = await connectionRequest
      .find({
        status: "accepted",
        $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      })
      .populate("fromUserId", safeData)
      .populate("toUserId", safeData);
    console.log(connectionReq);
    const data = connectionReq.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.totoUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("Error:" + " " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    loggedInUser = req.user;

    const page = parseInt(req.query.page) ||1
    let limit = parseInt(req.query.limit)||10
        limit>50?50:limit
    const skip = (page-1)*limit;

    //Here we are checking if logged user sent connection (intrested) or recieve any request so he will be present with both the Id;

    const connectionReq = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionReq.forEach((req) => {
      console.log(req);
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    //Hideuserfromfeed has some data we are hiding in not in 
    //and not equal to the same user who is logged in; logic below;

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(safeData).skip(skip).limit(limit);

    res.json({data:user});
  } catch (err) {
    res.status(400).send("Error:" + " " + err.message);
  }
});

module.exports = userRouter;

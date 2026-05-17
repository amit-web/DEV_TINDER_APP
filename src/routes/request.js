const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user"); // Changed 'user' to 'User' to avoid shadowing
const ConnectionRequest = require("../models/connectionRequest"); // Changed 'connectionReq' to 'ConnectionRequest'

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("sending connction to the user");
    const user = req.user;
    res.send("Connection request sent by:" + " " + user.firstName);
  } catch (err) {
    res.status(400).send("Failed to sent request");
  }
});

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //get the data of user , user is logged in and want to send the connection request;
      //Whom he need to send the request you are getting the id of that user from params
      const fromUserId = req.user._id;
      console.log(fromUserId);
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Logic: User can't send request to itself
      if (fromUserId.toString() === toUserId.toString()) {
        return res.status(400).send("You cannot send a connection request to yourself!");
      }

      let allowedStatus = ["ignored", "intrested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid request");
      }

      //User is in your db or not? (Using 'User' model now)
      const findUserInDB = await User.findById(toUserId);
      if (!findUserInDB) {
        return res.status(400).send("USer not Found!!!");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName +
          " " +
          status +
          " " +
          "in" +
          " " +
          findUserInDB.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + " " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      //Will check user is logged in or not by using middleware userAuth method
      //we are getting logged in user details from there,and
      const loggedInUserId = req.user._id;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      console.log(status, requestId, "loggedInuserId:", loggedInUserId.toString());
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Status not correct!!");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "intrested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request not found!!" });
      }

      //logged in user can't send request to itself
      // (Bhai yahan aapka review logic chal raha hai)

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      // Fixed typo: mesaage -> message
      res.json({ message: `connection request ${status}`, data });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  }
);

module.exports = requestRouter;
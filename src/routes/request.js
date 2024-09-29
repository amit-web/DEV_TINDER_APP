const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      console.log("sending connction to the user");
  
      const user = req.user;
      res.send("Connection request sent by:" + " " + user.firstName);
    } catch (err) {
      res.status(400).send("Failed to sent request");
    }
  });

module.exports = requestRouter;
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect('mongodb+srv://amitmehtawebdev:In9qHm4hCdbnJbI1@namstenode.psmgj.mongodb.net/devTinder');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports={
    connectDB
}
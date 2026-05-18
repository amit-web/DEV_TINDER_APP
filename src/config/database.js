const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb+srv://amitmehtawebdev:12w6aYkbX6FbB8IW@namstenode.psmgj.mongodb.net/devTinder");
}

module.exports = { connectDB };
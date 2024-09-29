const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim:true
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim:true
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim:true,
      validate:function(value){
       if(!validator.isEmail(value)){
        throw new Error("Email is not vaild!!! please provide valid email!!");
       }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 500,
      trim: true,
      validate:function(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Passwword strenth is low, give strong password")
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate: function (value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error();
        }
      },
    },
    skills: {
      type: [String]
    },
    photoUrl: {
      type: String,
      default:
        "https://virtualconcerthalls.com/wp-content/uploads/2021/07/placeholder.jpg",
        validate:function(value){
        if(!validator.isURL(value)){
          throw new Error("Please provide correct PhotoURL")
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about User!!",
    },
  },
  { timestamps: true }
);


//Always write in normal function :---->

userSchema.methods.getJWT = async function(){
  const user = this;
    const token = await jwt.sign({_id:user._id}, "devTinder9334", {
      expiresIn: "7d",
    }) 

    return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;
  const passwordHash = user.password
  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
   return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);

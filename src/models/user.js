const mongoose = require("mongoose");
const validator = require('validator');

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
      maxlength: 12,
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
      type: [String],
      validate:function(value){
        if(!(value.length>= 6 && value.length<=10)){
           throw new Error("can't Add more than 10 skills, min=6")
        }
      }
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

module.exports = mongoose.model("User", userSchema);

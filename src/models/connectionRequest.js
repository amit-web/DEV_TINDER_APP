const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//Refrance to the user collection:---.
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","intrested", "accepted", "rejected"],
            message:`{VALUE} is incorrect status type.`
        }
    }

},
{
    timestamps:true,
}
)

//Make the query faster:--->
//Why do we need index in DB?
//What is the advantage and disadvantage of creating?
//Read the article about compound indexes

connectionRequestSchema.index({fromUserId:1,toUserId:1});
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this
    //Check if the fromUserId is same as touserId;
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannot send conection request to yourself!!!");
}
next();
})

const conncetionRequestModel = new mongoose.model("connectionRequest",connectionRequestSchema)


module.exports = conncetionRequestModel;
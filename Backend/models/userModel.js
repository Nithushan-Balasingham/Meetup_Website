const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
    country:{
        type:String,
        required:[true,"Please Enter the Country"]
    },
    enroll:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Please Enter the Password"]
    },
},{
    timestamps:true
})
const User = mongoose.model('User', userSchema);
module.exports = User;

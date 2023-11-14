const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please Enter the list name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter the description"],
  },
  meetingType: {
    type: String,
    required: [true, "Please Enter the Meeting Method"],
  },
  meeting: {
    type: String,
    required: [true, "Please Enter the Meeting"],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  country:{
    type:String,
    required:[true,"Please Enter the Country"]
},
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['done', 'nope'],
    default: 'nope',
  },
  count: {
    type: Number,
    default: 0,
  },
  enrolledUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: String,
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);

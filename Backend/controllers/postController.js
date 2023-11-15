const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")
const path = require('path');

const fs = require('fs');


const addPost = asyncHandler(async (req, res) => {
  const { name, description, meeting, date, time, meetingType, country } = req.body;

  if (!name || !description || !meeting || !req.file || !date || !time || !meetingType || !country) {
    res.status(400);
    return res.json({ error: "All fields are mandatory" });
  }

  try {
    const dateTime = new Date(`${date}T${time}`);
    
    const post = await Post.create({
      name,
      description,
      meeting,
      meetingType,
      user_id: req.user.id,
      image: req.file.filename,
      date: dateTime,
      time: time, 
      country
    });

    res.status(200).json(post);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});


  const getPosts = asyncHandler(async(req,res)=>{
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
        console.log(posts)
    } catch (error) {
        console.error("Error" , error.message)
        return res.status(500).json({error:"Server Error"})
    }
})
const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const post = await Post.findById(id).populate('user_id', 'name');
      if (!post) {
        return res.status(404).json({ message: "Not Found" });
      }
      
      const userName = post.user_id.name;

      return res.status(200).json({ ...post.toJSON(), userName });
    } catch (error) {
      console.error("Error", error.message);
      return res.status(500).json({ error: "Server Error" });
    }
  } else {
    return res.status(404).json("Not Found");
  }
});


const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const post = await Post.findById(id);
      if (!post) {
        res.status(404);
        throw new Error("Not found");
      }
      if (post.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have access");
      }

      if (req.file) {
        post.image = req.file.filename;
      }

      post.name = req.body.name || post.name;
      post.description = req.body.description || post.description;
      post.meeting = req.body.meeting || post.meeting;
      post.country = req.body.country || post.country

      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error("Error:", err.message);
      return res.status(500).json({ error: "Server Error" });
    }
  }
});
const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const post = await Post.findById(id);

      if (!post) {
        res.status(404);
        throw new Error("Not found");
      }

      if (post.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have access to delete");
      }

      const imageFilename = post.image; // Get the filename

      await Post.deleteOne({ _id: id });

      // Clear the image from local storage
      if (imageFilename) {
        const imagePath = path.join(__dirname, '../uploads', imageFilename);
        fs.unlinkSync(imagePath);
      }

      res.status(200).json(post);
    } catch (err) {
      console.error("Error:", err.message);
      return res.status(500).json({ error: "Server Error" });
    }
  }
});
const enrollPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isEnrolled = post.enrolledUsers.some(
      (user) => user.userId.toString() === req.user.id
    );
    if (isEnrolled) {
      return res.status(400).json({ message: "User already enrolled" });
    }

    post.enrolledUsers.push({
      userId: req.user.id,
      userName: req.user.name,
      enroll:true
    });
    post.count += 1;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error", error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

const disenrollPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isEnrolled = post.enrolledUsers.some(
      (user) => user.userId.toString() === req.user.id
    );
    if (!isEnrolled) {
      return res.status(400).json({ message: "User not enrolled" });
    }

    post.enrolledUsers = post.enrolledUsers.filter(
      (user) => user.userId.toString() !== req.user.id
    );
    post.count -= 1;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error", error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports={
    addPost,
     getSinglePost,
    getPosts,
    updatePost,
    deletePost,
    enrollPost,
    disenrollPost
}
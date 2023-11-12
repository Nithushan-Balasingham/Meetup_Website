const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")



const addPost = asyncHandler(async (req, res) => {
      const {  name, description,meeting } = req.body;
      if (!name || !description || !meeting || !req.file) {
        res.status(400);
        return res.json({ error: "All fields are mandatory" });
  }
    try {
      const post = await Post.create({
        name,
        description,
        meeting,
        user_id: req.user.id,
        image: req.file.filename,
      });
      res.status(200).json(post);
    } catch (err) {
      console.error("Error:", err.message);
      return res.status(500).json({ error: "Server Error" });
    }
  });

  const getPosts = asyncHandler(async(req,res)=>{
    try {
        const posts = await Post.find({user_id:req.user.id})
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
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({message:"Not Found"});
    }
    if (post.user_id.toString() !== req.user.id) {
      return res.status(403).json("Not Authorized");
    }
    return res.status(200).json(post);
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

      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error("Error:", err.message);
      return res.status(500).json({ error: "Server Error" });
    }
  }
});
const deletePost= asyncHandler(async(req,res)=>{
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      throw new Error("Not found");
    }
    if(post.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User dont have access to delete")
    }
    await Post.deleteOne({ _id: id })
    res.status(200).json(post)
}})

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
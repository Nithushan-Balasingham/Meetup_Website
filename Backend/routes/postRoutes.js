const express = require("express")
const router = express.Router()

const { addPost, getSinglePost, getPosts, updatePost,deletePost, enrollPost, disenrollPost } = require("../controllers/postController")
const validateToken = require("../middleware/validateToken")

router.route('/addPost').post(validateToken, (req, res) => {
    req.upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      addPost(req, res);
    });
  });
  router.route("/:id")
  .put(validateToken, (req, res) => {
    req.upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      updatePost(req, res);
    });
  })
  .delete(validateToken, deletePost)
  .get( getSinglePost);


    
router.route('/enroll/:id').patch(validateToken,enrollPost)
router.route('/disenroll/:id').patch(validateToken,disenrollPost)



router.route("/").get(getPosts)



module.exports=router
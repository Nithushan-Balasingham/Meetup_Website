const express = require("express")
const router = express.Router()

const { addPost, getSinglePost, getPosts, updatePost,deletePost, enrollPost, disenrollPost } = require("../controllers/postController")
const validateToken = require("../middleware/validateToken")

router.route('/addPost').post(validateToken,addPost)


router.route("/:id").put(validateToken,updatePost).delete(validateToken,deletePost).get(validateToken,     getSinglePost,
    )
router.route('/enroll/:id').patch(validateToken,enrollPost)
router.route('/disenroll/:id').patch(validateToken,disenrollPost)



router.route("/").get(validateToken,getPosts)



module.exports=router
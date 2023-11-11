const express = require("express")
const {register, login, logOut, updateUser, deleteUser, getSingleUser} = require('../controllers/userController')
const validToken = require('../middleware/validateToken')

const router = express.Router()

router.post("/register", register)
router.post('/login', login)
router.post('/logOut', logOut)

router.route("/:id").put(updateUser).delete(validToken, deleteUser).get(validToken,getSingleUser)


module.exports = router
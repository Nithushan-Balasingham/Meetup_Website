const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = asyncHandler (async(req,res)=>{
    const {name, email, country, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const isUserRegistered = await User.findOne({email})
    if(isUserRegistered){
        res.status(400).send({message:"Already Registered"})
        throw new Error("User Already Existing in the System")
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        country,
        password:hashedPassword
    })

    if(user){
        res.status(201).send({_id:user._id, email:user.email, name:user.name, country:user.country})
    }else{
        res.status(400)
        throw new Error("User Data is not valid")
    }
    res.json({message:"User Registered Successfully"})
})

const login = asyncHandler(async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign(
                {
                    user:{
                        name:user.name,
                        email:user.email,
                        id:user.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,{expiresIn:"50m"}
            )
            res.status(200).json({accessToken, userName:user.name, userEmail:email, userId:user.id})
        }else{
            res.status(401).json({message:"Incorrect email or password"})
        }
    } catch (error) {
        console.log(error)
    }
})


const currentUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }
})

const logOut = (req,res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message:"Logged Out Successfully"})
}


const updateUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findById(id);
        if(!user){
            res.status(404);
            throw new Error("Not found")
        }
    }
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(updatedUser)
})


const deleteUser = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    await User.findByIdAndDelete(userId)
    res.json({message:"User Account Deleted"})
})

const getSingleUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findById(id);

        if(!user){
            res.status(404);
            throw new Error("Not Found")
        }
        res.status(200).json(user)
    }

})

module.exports= {
    register,
    login,
    currentUser,
    logOut,
    updateUser,
    deleteUser,
    getSingleUser
}
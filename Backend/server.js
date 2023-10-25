const express = require('express')
const connectDB = require('./dBConfig/dbConfig')
const dotenv = require('dotenv').config()
const cors = require('cors')

connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

app.use("/api/users", require("./routes/userRoute"))

app.listen(port,()=>{
    console.log(`Server is running a ${port}`)
})
// Evironment set up
const env = require('dotenv');
env.config();
const express = require('express')
const app = express()

// Database set up
const mongoose = require('mongoose')
const atlas_url = process.env.MONGO_URL
mongoose.connect(atlas_url)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err))

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const usersRouter = require('./routes/users')
app.use('/api/users', usersRouter)

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter)


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is on");
})
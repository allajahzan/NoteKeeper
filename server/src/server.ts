import express from 'express';
import router from './router/note'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose';

// configure dotenv
dotenv.config()

// create app
const app = express()

// cors
app.use(cors())

// static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// use route
app.use('/', router)

mongoose.connect('mongodb+srv://allajahzan:Allajpk%40291407@notekeeper.ulp5p.mongodb.net/?retryWrites=true&w=majority&appName=NoteKeeper')
.then(()=>{
    console.log('Connected to DB')
})
.catch((err)=>{
    console.log(err)
})

// setup server
app.listen(3000, ()=>{
    console.log("Server is running on port 3000 http://localhost:3000")
})
import express from 'express';
import {googleclientid} from "./secret"
console.log(googleclientid)
import  "passport-github2"
import cookieSession from 'cookie-session';
import passport from 'passport';
// console.log(passport)
// import passport from "passport";
import UserRouter from './Routes/userauth.route';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';
import cors from "cors"
import { shortnerRouter } from './Routes/shortner.route';
import "./passport"

const app: express.Application = express()
const  port = 8080
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true 
}))
app.use(cookieSession({
name:"session",
keys:["hello"],
maxAge:60*60
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser())
app.use(express.json())
app.use("/userauth",UserRouter)
app.use("/shortner",shortnerRouter)

console.log("i am in main file")


app.get("/",(_req,res):void=>{
res.json({message:"anurag"})

})

app.listen(port,async () =>{
    
try {
    await mongoose.connect("mongodb+srv://anurag:anuragupadhyay@cluster0.8epkihf.mongodb.net/unit-5CW?retryWrites=true&w=majority")

console.log("connected to db successfully")   
} catch (error) {
    console.log(error)
} 
console.log("listening on port 8080")
})
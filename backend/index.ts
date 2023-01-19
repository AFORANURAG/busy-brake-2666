import express from 'express';
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.MONGO_URL)
import UserRouter from './Routes/userauth.route';
import mongoose from 'mongoose';
 
import cookieParser from 'cookie-parser';

import { shortnerRouter } from './Routes/shortner.route';

const app: express.Application = express()
const  port = 8080
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
import  Redis  from 'ioredis';
import express, { response } from 'express';
import {MONGO_URL,SECRET_KEY} from "../secret"
import _jsonwebtoken from "jsonwebtoken";

import _bcrypt from "bcrypt";

import UserModel from '../models/user.model';
import { Model } from 'mongoose';

import { authenticator } from '../middlewares/authenticator.middleware';
import Passportmodel from '../models/passport.model';

const shortnerRouter=express.Router()

shortnerRouter.get("/",authenticator,async(req,res)=>{
    res.json("welcome to user router")
})
shortnerRouter.get("/givemeinfo",async (req,res)=>{

let loadeddata=await Passportmodel.findOne({})
if(loadeddata){
res.json(loadeddata)
}else{
res.json({message:"you have not signed up/logged in  till yet, please do and come back later "})
} 

})


export {shortnerRouter}

const redis=new Redis()
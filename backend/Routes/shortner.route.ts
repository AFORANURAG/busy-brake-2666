import  Redis  from 'ioredis';
import express, { response } from 'express';
import {MONGO_URL,SECRET_KEY} from "../secret"
import _jsonwebtoken from "jsonwebtoken";

import _bcrypt from "bcrypt";

import UserModel from '../models/user.model';
import { Model } from 'mongoose';

import { authenticator } from '../middlewares/authenticator.middleware';

const shortnerRouter=express.Router()

shortnerRouter.get("/",authenticator,async(req,res)=>{
    res.json("welcome to user router")
})

export {shortnerRouter}

const redis=new Redis()
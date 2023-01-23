import  Redis  from 'ioredis';
import express, { response } from 'express';
import {MONGO_URL,SECRET_KEY} from "../secret"
import _jsonwebtoken from "jsonwebtoken";
import { checkUrl } from '../middlewares/urlvalidator.middleware';
import _bcrypt from "bcrypt";
import { createHmac } from 'crypto';

import UserModel from '../models/user.model';
import { Model } from 'mongoose';

import { authenticator } from '../middlewares/authenticator.middleware';
import Passportmodel from '../models/passport.model';
import { ShortnerModel } from '../models/shorturl.model';
// import {node}

// shortUrl.short("https://codeportal.in", function (err, url) {
//     console.log(url);
// });
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


shortnerRouter.post("/longurl/md5",async (req,res)=>{
    let full=req.body.longurl;
    let domain=req.body.custimization
    console.log(full,domain)
    if(checkUrl(full)){
    let initiallength=full.length;    
 
const hash = createHmac("MD5", full)
               .update('I love cupcakes')
               .digest('hex');

    try {
let shortedstring=hash.substring(0,7)
let short=shortedstring+domain
let finallength=short.length; 
let data = new ShortnerModel({short,full,initiallength,finallength})
await data.save()
return res.json({message:"url shorted successfully",shortedurl:short})
    } catch (error) {
        console.log(error)
        res.json({message:"error is shorteniung your url",error:error.message})
    }
    }
    else{
    return res.json({message:"Please send a valid url response"})
    }
    
    })


    

    shortnerRouter.post("/longurl/sha256",async (req,res)=>{
        let full=req.body.longurl;
        let domain=req.body.custimization;
        if(checkUrl(full)){
        let initiallength=full.length;    
     
    const hash = createHmac("sha256", full)
                   .update('I love cupcakes')
                   .digest('hex');
    
        try {
    let shortedstring=hash.substring(0,7)
    let short=shortedstring+domain
    let finallength=short.length; 
    let data = new ShortnerModel({short,full,initiallength,finallength})
    await data.save()
    return res.json({message:"url shorted successfully",shortedurl:short})
        } catch (error) {
            console.log(error)
            res.json({message:"error is shorteniung your url",error:error.message})
        }
        }
        else{
        return res.json({message:"Please send a valid url response"})
        }
        
        })
    
        
        shortnerRouter.post("/longurl/sha512",async (req,res)=>{
            let full=req.body.longurl;
            let domain=req.body.custimization;
            if(checkUrl(full)){
            let initiallength=full.length;    
         
        const hash = createHmac("sha512", full)
                       .update('I love cupcakes')
                       .digest('hex');
        
            try {
        let shortedstring=hash.substring(0,7)
        let short=shortedstring+domain
        let finallength=short.length; 
        let data = new ShortnerModel({short,full,initiallength,finallength})
        await data.save()
        return res.json({message:"url shorted successfully",shortedurl:short})
            } catch (error) {
                console.log(error)
                res.json({message:"error is shorteniung your url",error:error.message})
            }
            }
            else{
            return res.json({message:"Please send a valid url response"})
            }
            
            })
                

shortnerRouter.post("/hash",async(req,res)=>{
    console.log("hello")
let short=req.body.shortedurl;
console.log(short)
try {
    let loadeddata=await  ShortnerModel.findOne({short:short})
    let longurl=loadeddata.full
    console.log(loadeddata,longurl)
   res.redirect("http://localhost:5173/")
} catch (error) {
 console.log(error)
 res.json({message:"error in redirecting",error:error.message})   
}

})







export {shortnerRouter}

const redis=new Redis()
// step1 is to short the url and store the version of short
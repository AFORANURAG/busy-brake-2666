// we will require to import secret keys and other thing here
import jsonwebtoken, { decode, Jwt } from "jsonwebtoken";
import {SECRET_KEY} from "../secret";
import express, { NextFunction } from "express"
import  {Redis}  from "ioredis";
import jwt_decode from "jwt-decode";

const redis=new Redis()

export const  authenticator=async (req:express.Request,res:express.Response,next:NextFunction):Promise<void>=>{

console.log(req.cookies)
    const Token=req.cookies?.accessToken
const tokensfromredis=await redis.lrange("blacklistedusers",0,-1)
console.log(tokensfromredis)
try {
if(tokensfromredis.includes(Token)){
res.json({message:"You are logged out please login again"})

}
else{
    interface accesstoken{
        emailId:string,
    }
 const verification=jsonwebtoken.verify(Token,SECRET_KEY)

const decoded=jwt_decode<accesstoken>(Token)

if(decoded&&verification){

//  console.log(decoded)
 const {emailId}=decoded
req.body.email=emailId
console.log(emailId)
 next()   
}else{
    res.status(401).json({message:"not authorize,Please login again"})
}
}  
} catch (error) {
 console.log(error)
 res.status(500).json({message:"somewent wrong",error:error})   
}

}

// now it is the time to create a oauth system.

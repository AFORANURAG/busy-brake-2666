import {googleclientid} from "./secret"
import {googleclientsecret} from "./secret"
import  passport from "passport"
import {githubclientid} from "./secret"
import {githubclientsecret} from "./secret"
import { Strategy } from "passport-google-oauth20";

import {Strategy as GitHubStrategy } from "passport-github2"

import { profile } from "console";
import UserModel from "./models/user.model"
import Passportmodel from "./models/passport.model"
// the types version actaully does not exist , if the types version is not running then try 
//running it with normal version , it can happen
// the types version passprt -google is not there and isliye vo kaaam nhi kr raha hai
var GoogleStrategy =Strategy
interface token{
  accessToken:string,
 
}

console.log(googleclientid)
passport.use(new GoogleStrategy({
    clientID: googleclientid,
    clientSecret: googleclientsecret,
    callbackURL: "http://localhost:8080/userauth/google/callback"
  },
  async function(accessToken:string, refreshToken:string, profile, done) {
   console.log(profile.photos[0].value,accessToken)
 let name=profile.displayName;
 let photo=profile.photos[0].value;

let data=new Passportmodel({name,photo,accessToken:accessToken})
  await data.save()

    done(null,profile)
  }

));
// callbackURL: "http://127.0.0.1:3000/auth/github/callback"

passport.use(new GitHubStrategy({
  clientID: githubclientid,
  clientSecret: githubclientsecret,
  callbackURL: "http://localhost:8080/userauth/github/callback"
},

async function(accessToken, refreshToken, profile, done) {
  console.log(profile.photos[0].value,accessToken)
  let name=profile.displayName;
  let photo=profile.photos[0].value;
 
 let data=new Passportmodel({name,photo,accessToken:accessToken})
   await data.save()
 
     done(null,profile)
}
));

passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.serializeUser((user,done)=>{
  done(null,user)
})

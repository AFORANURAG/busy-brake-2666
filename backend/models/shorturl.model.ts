import mongoose from "mongoose"
interface shortUrl{
full:string,
short:string,
click:number,
initiallength:number,
finallength:number
}

const shorturlSchema=new mongoose.Schema <shortUrl> ({
full:{
    type:String,
    required:true
},
short:{
    type:String,
    required:true
},
click:{
    type:Number,
    required:true
},

})
import mongoose, { model } from "mongoose"
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
initiallength:{
    type:Number,
    required:true
},
finallength:{
    type:Number,
    required:true
},

})
const ShortnerModel=model<shortUrl>("url",shorturlSchema);
export {ShortnerModel}
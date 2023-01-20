import mongoose from "mongoose"
interface shortUrl{
full:string,
short:string,
click:number,
initiallength:string,
finallength:string
}
const shorturlSchema=new mongoose.Schema <shortUrl> ({
full:{
    
}

})
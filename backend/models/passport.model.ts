import mongoose, { Model,Schema,Types,Document } from "mongoose";
const {model}=mongoose

interface IUser extends Document {
    name: string;
    email: string;
   github:string,
    photo:string,
    accessToken:string,
    refreshToken:string
  }
  
const userSchema=new Schema<IUser>({
name :{type:String,required:true},  
email :{type:String},
accessToken:{type:String,required:true},
photo:{type:String,required:false}
})

const Passportmodel=model<IUser>("passportuser",userSchema)



export default Passportmodel
import mongoose, { Model,Schema,Types,Document } from "mongoose";
const {model}=mongoose

interface IUser extends Document {
    name: string;
    email: string;
    age:number;
    password:string
    photo:string
  }
  
const userSchema=new Schema<IUser>({
name :{type:String,required:true},  
email :{type:String,required:true},
age:{type:Number,required:true},
password:{type:String,required:true},
photo:{type:String,required:false}
})

const UserModel=model<IUser>("User",userSchema)



export default UserModel
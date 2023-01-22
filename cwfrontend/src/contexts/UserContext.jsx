import React,{useContext,createContext,useState} from "react";
 const UserContext=createContext()

  const UserContextProvider=({children})=>{

   const [user,setUser]=useState({email:"",password:""})
   
   const handleClick=async ()=>{

   
   try {
     let res=await fetch("http://localhost:8080/userauth/login",{
       method:"POST",
       body:JSON.stringify(user),
       headers:{
         "Content-Type":"application/json"
       }
       })
       let data=await res.json()
       console.log(data.refreshToken)
     localStorage.setItem("refreshToken",data.refreshToken)
   } catch (error) {
     console.log(error)
   }
   
   }
   
   const handleOnChange=(e)=>{
     const {name,value}=e.target;
     setUser({
      ...user,
      [name]:value 
     })
     console.log(user)
   }
   const value={
    user,setUser,handleClick,handleOnChange
   }




    return (<UserContext.Provider value={value}>
    {children}
    </UserContext.Provider>)
 }
export {UserContextProvider,UserContext}
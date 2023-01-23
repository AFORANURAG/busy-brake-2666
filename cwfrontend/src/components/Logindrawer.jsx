import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import React from 'react';
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { UserContext, UserContextProvider} from '../contexts/UserContext.jsx';

export default function Login() {


const [user,setUser]=useState({email:"",password:""})


 const handleClick=async ()=>{
let email=user.email;
let password=user.password;


try {
  let res=await fetch("http://localhost:8080/userauth/login",{
    method:"POST",
    body:JSON.stringify(user),
    headers:{
      "Content-Type":"application/json"
    }
    })
    let data=await res.json()
    console.log(data.refreshToken,data.name)
    localStorage.setItem("name",data.name)
    localStorage.setItem("logged","in")
  localStorage.setItem("refreshToken",data.refreshToken)

  window.location.reload()
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
// const value={
//   cookies,user,handleClick,handleOnChange
// }
const handleclick=()=>{
  console.log("A Button Is Clicked")
  let name=user.firstname+user.lastname;
  let password=user.password;
  let email=user.email;
  let age=user.age
  let obj={name,password,email,age}
fetch("http://localhost:8080/userauth/signup",{
method:"POST",
body:JSON.stringify(obj),
headers:{
  "Content-Type":"application/json"
}

}).then((res)=>res.json()).then(data=>console.log(data)).catch((err)=>console.log(err))

}
const github=()=>{
  window.open("http://localhost:8080/userauth/github")
}
const google=()=>{
  window.open("http://localhost:8080/userauth/google")
}
  return (

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login To Your Account</Heading>
         
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={user.email} onChange={handleOnChange} name="email" type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={user.password} onChange={handleOnChange}  name="password" type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
              onClick={handleClick}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Button
            
              onClick={google}
                loadingText="Submitting"
                size="lg"
                bg={'white'}
                color={'black'}
                _hover={{
                  bg: 'green',
                }}
               border={"1px"} 
              >
                Continue With Google
              </Button>

              <Button
              loadingText="Submitting"
              onClick={github}
              size="lg"
              bg={'black'}
              color={'white'}
              _hover={{
                bg: 'green',
              }}>
               Continue With Github
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

  );
}
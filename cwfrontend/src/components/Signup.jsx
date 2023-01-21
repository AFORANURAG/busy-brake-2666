import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Signup({onopen,show,setShow}) {
  const [user,setUser]=useState({firstname:"",lastname:"",email:"",password:"",age:""})
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState()
let navigate=useNavigate()
  function sendtologin(){
     setShow(false) 
    onopen()
// navigate("#login")
}
// let the development begin bro! now feel the power of Js
const google=()=>{
  window.open("http://localhost:8080/userauth/google")
}
const github=()=>{
  window.open("http://localhost:8080/userauth/github")
}



function handlechange(e){
let {value,name}=e.target;
console.log(value,name)

setUser({
   ...user,[name]:value
})

}
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

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input name='firstname' value={user.firstname} onChange={handlechange} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel> Last Name</FormLabel>
                  <Input name='lastname' type="text"  onChange={handlechange} value={user.lastname} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input onChange={handlechange} name="email" value={user.email} type="email" />
            </FormControl>

            <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input onChange={handlechange} name="age" value={user.age} type="number" />
          </FormControl>



            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input name="password" value={user.password} onChange={handlechange} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                onClick={handleclick}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
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
                <img src="https://blog.hubspot.com/hubfs/image8-2.jpg"  width={"50px"} alt="" srcset="" />
               Continue with Google
              </Button>


            </Stack>
            <Stack pt={6}>
              <Text align={'center'} onClick={sendtologin}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
import React,{useState,} from 'react'
import { Box,Flex,Button} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Heading,
    Input
  } from '@chakra-ui/react'
  import Offcanvas from 'react-bootstrap/Offcanvas';
  import Signup from './Signup';
import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react'
export default function Body() {
  let [refreshToken,setRefreshToken]=useState("")
  useEffect(()=>{
setRefreshToken(localStorage.getItem("refreshToken"))
  },[])
  console.log(refreshToken)
  const [isauthenticated,setAuthenticated]=useState(false)

useEffect(()=>{
   ()=>{
if(refreshToken){
setAuthenticated(true)
}else{
  setAuthenticated(false)
}
  }
},[refreshToken])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Flex flexWrap={'nowrap'} w={"100%"} h={"700px"} pt={10} bg={"black"} id='body' >
    <Box w={"30%"}  h={"max-content"} ml={10}  border={"1px solid black"}>
  
    <FormControl>
    <FormLabel>Enter Url</FormLabel>
    <Input type='email' />
    
    <FormLabel>Customize Your Link</FormLabel>
    <Select  color={"black"} placeholder='customized your link'>
      <option>md-5</option>
      <option>sha-512 </option>
      <option>sha-256 </option>
</Select>

<FormLabel>Short Url</FormLabel>
<Select  color={"black"} placeholder='algorithm'>
<option>shor8ner.com</option>
<option>tinyurl.com</option>
<option>library.com</option>

</Select>

<Button variant={"ghost"} bg={"black"} mt={5} ml={"40%"} _hover={{bg:"white",color:"black"}}> Short It </Button>

<Flex style={{justifyContent:"center"}} mt={"10px"}>
<Button variant={"ghost"} bg={"black"} ml={4} _hover={{bg:"white",color:"black"}}> visit url </Button>
<Button variant={"ghost"} bg={"black"} ml={4} _hover={{bg:"white",color:"black"}}> Email </Button> 
<Button variant={"ghost"} bg={"black"} ml={4} mr={5} _hover={{bg:"white",color:"black"}}> QR </Button>
</Flex>

<Flex style={{justifyContent:"center"}} mt={"10px"} >
<Button variant={"ghost"} bg={"black"} ml={"16%"} mr={12} _hover={{bg:"white",color:"black"}}>Copy</Button>
</Flex>


  </FormControl>
    
    </Box>
    <Box w={"30%"}  display={isauthenticated?"block":"none"} h={"50%"} ml={10}  border={"1px solid black"}>
   <h2>Welcome to Shor8ner</h2> 
   <h3>   Create a free account to enjoy:
   </h3>
   &#10003;<span>Free Url History.</span>
   <br />
   &#10003;<span>Easy and Fast Link Shortening.</span>
   <br />
   &#10003;<span> Our Website uses some of the best url shortening algorithm.</span>
   <br />
   &#10003;<span> You Will Get more benefits as compare to any other url shortening website.</span>

   <Button variant={"outline"} display={isauthenticated?"block":"none"} ml={"15%"} mt={5} _hover={{backgroundColor:"white",color:"black"}} color={"white"} bg={"blackAlpha.100"} mr={10} onClick={handleShow}>
 Create a free account today
   </Button>



    </Box>

    <>
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Signup onopen={onOpen} show={show} setShow={setShow}/>
      </Offcanvas.Body>
    </Offcanvas>
  </>
 </Flex>
  )
}

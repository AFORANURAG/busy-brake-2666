import React,{useState,useRef} from 'react'
import { Box,Flex,Button} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import Modal from 'react-bootstrap/Modal';
// import QRCode from "react-qr-code";
import QRCode from "qrcode";
// import

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
const [algorithm,setAlgorithm]=useState();
const [custimization,setcustomization]=useState();
const [longurl,setlongurl]=useState()
const [shorturl,setshorturl]=useState("")
const [refreshToken,setRefreshToken]=useState("")
console.log(refreshToken)
  const [isauthenticated,setAuthenticated]=useState(false)
  let status= localStorage.getItem("logged")||null;
  console.log(status)
console.log(isauthenticated)

useEffect(()=>{
setRefreshToken(localStorage.getItem("refreshToken"))
  },[])
  
useEffect(()=>{
   
verify()
  
},[])

function verify(){
  if(status=="in"){
    setAuthenticated(true)
    }else{
      setAuthenticated(false)
    }
}

const { isOpen, onOpen, onClose } = useDisclosure()
const [show, setShow] = useState(false);
const [show1, setShow1] = useState(false)
const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const handleClose1 = () => setShow1(false);
const [text, setText] = useState("");

const canvasRef = useRef();

const shorter= async()=>{

if(checkUrl(longurl)){
// if yes then send to server
let res=await fetch(`http://localhost:8080/shortner/longurl/${algorithm}`,{
  method:"POST",
  body:JSON.stringify({longurl,custimization}),
  headers:{
    "Content-Type":"application/json"
  }
})
let data=await res.json()
console.log(data)
setshorturl(data.shortedurl)
}else{
console.log("invalid url")
setShow1(true)
}
}


useEffect(() => {
 Qregenerate
},[shorturl]);
const Qregenerate=()=>{
  QRCode.toCanvas(
    canvasRef.current,
    // QR code doesn't work with an empty string
    // so we are using a blank space as a fallback
    shorturl || " ",
    (error) => error && console.error(error)
  );
}

const emailopen=()=>{

}
const visit=async ()=>{
  let shortedurl=shorturl
  let obj={shortedurl}
  // console.log(shorturl)
let res= await fetch(`http://localhost:8080/hash`,{
  method:"POST",
  body:JSON.stringify(obj),
  headers:{
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin": "*"  
  },
  mode:"no-cors",
})


}
const copy=()=>{

}
function checkUrl (string) {
  let givenURL ;
  try {
      givenURL = new URL (string);
  } catch (error) {
      console.log ("error is", error);
     return false; 
  }
  return true;
}
console.log(isauthenticated)
  return (
    <Flex flexWrap={'nowrap'} w={"100%"} h={"700px"} pt={10} bg={"black"} id='body' >
    <Box w={"30%"}  h={"max-content"} ml={10}  >
  
    <FormControl>
    <FormLabel>Enter Url</FormLabel>
    <Input type='email' value={longurl} onChange={(e)=>{setlongurl(e.target.value)}} _placeholder={{color:"white"}}  placeholder='enter the long/fullurl' />
    
    <FormLabel>Algorithm</FormLabel>
    <Select value={algorithm} onChange={(e)=>{setAlgorithm(e.target.value)}}  color={"black"} _placeholder={{color:"white"}}  placeholder='algorithm'>
    <option>md5</option>
    <option>sha512 </option>
    <option>sha256 </option>
    </Select>
    
    <FormLabel>Customize Your Link</FormLabel>
<Select value={custimization} onChange={(e)=>{setcustomization(e.target.value)}} color={"black"}   placeholder='customized your link' _placeholder={{color:"white"}}>
<option>shor8ner.com</option>
<option>tinyurl.com</option>
<option>anurag.com</option>

</Select>

<Textarea style={{textDecoration:"underline",cursor:"pointer"}} value={shorturl}   mt={10} placeholder='Short Url' onClick={visit} _placeholder={{color:"white"}} color={"black"} />




<Button onClick={shorter} variant={"ghost"} bg={"black"} mt={5} ml={"40%"} _hover={{bg:"white",color:"black"}}> Short It </Button>

<Flex style={{justifyContent:"center"}} mt={"10px"}>
<Button onClick={isauthenticated?visit:handleShow} variant={"ghost"} bg={"black"} ml={4} _hover={{bg:"white",color:"black"}}> visit url </Button>
<Button onClick={isauthenticated?emailopen:handleShow} variant={"ghost"} bg={"black"} ml={4} _hover={{bg:"white",color:"black"}}> Email </Button> 
<Button onClick={isauthenticated?Qregenerate:handleShow} variant={"ghost"} bg={"black"} ml={4} mr={5} _hover={{bg:"white",color:"black"}}>QR</Button>
</Flex>

<Flex style={{justifyContent:"center"}} mt={"10px"} >
<Button onClick={isauthenticated?copy:handleShow} variant={"ghost"} bg={"black"} ml={"16%"} mr={12} _hover={{bg:"white",color:"black"}}>Copy</Button>
</Flex>


  </FormControl>
    
    </Box>
    <Box w={"30%"}  display={isauthenticated?"none":"block"} h={"50%"} ml={10} >
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
  <>


  <Modal show={show1} onHide={handleClose1}>
    <Modal.Header closeButton>
      <Modal.Title>Invalid Url</Modal.Title>
    </Modal.Header>
    <Modal.Body>Warning.It seems that you are filling a wrong url.Please fill a valid url</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
     
    </Modal.Footer>
  </Modal>
</>
<>

<div style={{marginLeft:"10%",marginTop:"120px"}}>
     
      <br />

      <canvas ref={canvasRef} />
    </div>

</>
</Flex>
  )
}

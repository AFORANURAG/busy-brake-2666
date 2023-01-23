import React,{useState,createContext,useContext} from 'react';
import { Link as routerLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import React, { useState } from 'react';
// import {Button as Rbutton} from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import History from './History';
import { UserContext } from '../contexts/UserContext';
// import anurag-upadhyay-modified from 
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Input
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Signup from './Signup';
import Logindrawer from './Logindrawer';
import { useRef } from 'react';
import { useEffect } from 'react';
import Body from './Body';
import { set } from 'mongoose';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navigationbar() {
 
  // console.log(user)
  const { isOpen, onOpen, onClose } = useDisclosure()
 
  const btnRef = React.useRef()
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
const [Name,setName]=useState();
const [photo,setPhoto]=useState();
console.log(photo)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const [isauthenticated,setAuthenticated]=useState(false)
  const [datafrompassport,setDataFromPassport]=useState()
  console.log(datafrompassport)
  let refreshToken= localStorage.getItem("refreshToken")||null;
  console.log(refreshToken)
  let name=localStorage.getItem("name")
  console.log(name)
  let status= localStorage.getItem("logged")||null;
  console.log(status)
useEffect(()=>{
getinfo()

},[])

async function getinfo(){
  let res=await fetch("http://localhost:8080/shortner/givemeinfo")
  let data=await res.json()
 
  setDataFromPassport(data)
  setName(data.name)
  setPhoto(data.photo)
  localStorage.setItem("logged","in")
}

useEffect(()=>{
if(status=="in"){
setAuthenticated(true)
}

},[])

 const logout=async ()=>{
console.log("logout button is clicked");
localStorage.setItem("logged","out")

window.location.reload()

}

  // const btnRef1=useRef()
  // const { isOpen, onOpen, onClose } = useDisclosure();

return (
<>
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    
    <Container>
    {isauthenticated?(
      <>
      <Navbar.Brand href="#home">
      <Image src='https://i.imgur.com/lRqHbO2.png' w={20}/>
      

     
      </Navbar.Brand>
      <Nav>
 
      <Image src={photo} w={10} mr={10}/>
      
      <Button cursor={"none"} mr={10} >
      {name?name:Name}
      
  </Button>    
<Button variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"white"} bg={"blackAlpha.100"} mr={10} onClick={handleShow1}>
    History
</Button>

<Button variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"white"} bg={"blackAlpha.100"} mr={10}  onClick={logout}>
Logout
 </Button>

    </Nav>
      
      </>
      
      ):(
<>
<Navbar.Brand href="#home">
      <Image src='https://i.imgur.com/lRqHbO2.png' w={20}></Image>
     
     
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
           
          </Nav>
          <Nav>
           
            
            <Button key={"kldjsajd"} variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"white"} mr={10} bg={"blackAlpha.100"} ref={btnRef}  onClick={onOpen}> Login</Button>
            
            
            <Button variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"white"} bg={"blackAlpha.100"} mr={10} onClick={handleShow}>
          Sign Up
          </Button>
    
        
    
          <Button variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"white"} bg={"blackAlpha.100"} mr={10} onClick={handleShow1}>
          History
           </Button>
     
          </Nav>
        </Navbar.Collapse>
      </>
      )}
      
     
    </Container>
  </Navbar>
     
 <>   
 
    <Drawer size={"md"}
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              
    
              <DrawerBody>
    <Logindrawer/>
              </DrawerBody>
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
</> 

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
 
 
 <Offcanvas show={show1} onHide={handleClose1}>
   <Offcanvas.Header closeButton>
     <Offcanvas.Title>Offcanvas</Offcanvas.Title>
   </Offcanvas.Header>
   <Offcanvas.Body>
     <History/>
   </Offcanvas.Body>
 </Offcanvas>


</>

</>

    
  );
}

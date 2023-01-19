import React from 'react';
import { Link as routerLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import anurag-upadhyay-modified from "
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
import SignupCard from './Signup';
import Logindrawer from './Logindrawer';
import { useRef } from 'react';
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

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // my projects is my identity;
  const btnRef = React.useRef()
  const btnRef1=useRef()
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
      <Image src='https://i.imgur.com/lRqHbO2.png' w={20}></Image>
      
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#Login">
          
          <Button key={"kldjsajd"} variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"whiteAlpha"} bg={"blackAlpha.100"} ref={btnRef}  onClick={onOpen}> Login</Button>
          
          </Nav.Link>
          <Nav.Link eventKey={2} href="#Signup">
          <Button key={"jklasjdk"} ref={btnRef1} variant={"outline"} _hover={{backgroundColor:"white",color:"black"}} color={"whiteAlpha"} bg={"blackAlpha.100"} onClick={onOpen}> Signup </Button>

          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
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
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
<SignupCard/>
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
     
 

    <Drawer size={"md"}
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef1}
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

    </>
  );
}
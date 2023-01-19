import { useState } from 'react'
import React from 'react'
import {ChakraProvider,Button,Box} from "@chakra-ui/react"
import { Route,Routes } from 'react-router-dom'
import Login from './components/Logindrawer'
import Signup from './components/Signup'
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./components/Body"
// ChakraProvider is a context api
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
  <ChakraProvider>
  
  
<Navbar/>

<Body/>

  <Routes>

  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>}/>
  
  </Routes>


  

  </ChakraProvider>
    
  )
}

export default App

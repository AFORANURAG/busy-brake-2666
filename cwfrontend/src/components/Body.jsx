import React from 'react'
import { Box,Flex} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Heading,
    Input
  } from '@chakra-ui/react'


export default function Body() {
  return (
    <Flex flexWrap={'nowrap'} w={"100%"} h={"700px"} pt={10} bg={"black"} id='body' >
    <Box w={"30%"}  h={"50%"} ml={10}  border={"1px solid black"}>
    
    <FormControl>
    <FormLabel>Email address</FormLabel>
    <Input type='email' />
    
    <FormLabel>Customize Your Link</FormLabel>
    <Select  color={"black"} placeholder='customized your link'>
      <option>shor8ner.com</option>
      <option>tinyurl.com</option>
      <option>library.com</option>
</Select>

<FormLabel>Choose Algorithm</FormLabel>
<Select  color={"black"} placeholder='algorithm'>
<option>shor8ner.com</option>
<option>tinyurl.com</option>
<option>library.com</option>

  </Select>
  </FormControl>
    
    </Box>
    <Box w={"30%"}  h={"50%"} ml={10}  border={"1px solid black"}>
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

    </Box>

    </Flex>
  )
}

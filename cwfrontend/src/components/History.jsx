import React from 'react'
import { Card, CardHeader, CardBody, StackDivider,CardFooter,Stack,Box,Text,Heading } from '@chakra-ui/react'

export default function History() {
  return (
    <Card>
    
    <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          View a summary of all your clients over the last month.
        </Text>
      </Box>

    </Stack>
  </CardBody>
    </Card>

  )
}

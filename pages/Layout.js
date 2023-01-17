import { Box, Divider, VStack } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    return (
        <VStack>
            <Navbar />
            <Divider />
            <Box w="100%" h="fit-content">
                {children}
            </Box>
        </VStack>
    )
}

export default Layout
import { Box, Divider, VStack } from '@chakra-ui/react'
import React from 'react'
import Footer from '../src/components/Footer'
import Navbar from '../src/components/Navbar'

const Layout = ({ children }) => {
    return (
        <VStack spacing="3">
            <Navbar />
            <Divider />
            <Box w="100%" h="fit-content">
                {children}
            </Box>

            <Divider />
            <Footer />


        </VStack>
    )
}

export default Layout
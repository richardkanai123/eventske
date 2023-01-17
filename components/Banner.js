import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Filter from './Filter'

const Banner = () => {
    return (
        <Flex direction="column" gap="20px" textAlign="center" p="3" w="100%">
            <Heading as="h2" fontSize="4xl" letterSpacing="2px" lineHeight="2" fontWeight="extrabold"  >EventsKe</Heading>
            <Text fontSize="xl" fontWeight="bold" letterSpacing="wide">We connect you, No Matter Your Location, No Matter the Hour</Text>
            <Text fontFamily="fantasy">Meet, Mingle and Have Fun 🎉🎈</Text>

            <Filter />
        </Flex>
    )
}

export default Banner
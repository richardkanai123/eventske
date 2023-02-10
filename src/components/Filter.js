'use client'

import { Box, Flex, Heading } from '@chakra-ui/react'

const Filter = () => {

    const Filters = [
        {
            id: 1,
            name: "Nairobi",
            image: "https://i.ibb.co/Y0SZBY0/Nairobi.jpg"
        },
        {
            id: 2,
            name: "Mombasa",
            image: "https://i.ibb.co/TrSyM87/Mombasa.jpg"
        },
        {
            id: 3,
            name: "Pool Party",
            image: "https://i.ibb.co/QJtCDMz/poolparty.jpg"
        },
        {
            id: 4,
            name: "Conference",
            image: "https://i.ibb.co/Zc0hDpq/conference.jpg"
        },
    ]


    return (
        <Flex w="100%" py="1" justify="space-evenly" gap="20px" align="center" flexWrap="wrap" mt="2">
            {
                Filters.map((filter) => (
                    <Box bgImage={`url(${filter.image})`}
                        key={filter.id}
                        bgPosition="center"
                        bgRepeat="no-repeat"
                        bgColor="gray.500"
                        bgBlendMode="overlay"
                        height={{ base: "150px", md: "150px", lg: "150px" }}
                        w={{ base: "250px", md: "200px", lg: "200px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        borderRadius="15px"
                        _hover={{
                            opacity: "0.5",
                            transition: "ease-in",
                            color: "skyblue"
                        }}
                    >
                        <Heading fontWeight="bold" as="h2" >{filter.name}</Heading>
                    </Box>
                ))
            }

        </Flex>

    )
}

export default Filter
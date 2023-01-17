import { Box, Flex, Heading } from '@chakra-ui/react'

const Filter = () => {
    return (
        <Flex w="100%" py="1" justify="center" gap="10px" align="center" flexWrap="wrap" mt="2">
            <Box bgImage="url('https://i.ibb.co/Y0SZBY0/Nairobi.jpg')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgColor="gray.500"
                bgBlendMode="overlay"
                height={['250px', '200px']}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={["100%", "100%", "300px"]} textAlign="center"
                borderRadius="15px"
                _hover={{
                    opacity: "0.5",
                    transition: "ease-in",
                    color: "skyblue"
                }}
            >
                <Heading fontWeight="bold" as="h2" >Nairobi</Heading>
            </Box>
            <Box bgImage="url('https://i.ibb.co/TrSyM87/Mombasa.jpg')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgColor="blue.500"
                bgBlendMode="overlay"
                height={['250px', '200px']}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={["100%", "100%", "300px"]} textAlign="center"
                borderRadius="15px"
                _hover={{
                    opacity: "0.5",
                    transition: "ease-in",
                    color: "skyblue"
                }}
            >
                <Heading fontWeight="bold" as="h2" >Mombasa</Heading>
            </Box>
            <Box bgImage="url('https://i.ibb.co/QJtCDMz/poolparty.jpg')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgColor="blue.600"
                bgBlendMode="overlay"
                height={['250px', '200px']}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={["100%", "100%", "300px"]} textAlign="center"
                borderRadius="15px"
                _hover={{
                    opacity: "0.5",
                    transition: "ease-in",
                    color: "skyblue"
                }}
            >
                <Heading fontWeight="bold" as="h2" >Pool Party</Heading>
            </Box>
            <Box bgImage="url('https://i.ibb.co/Zc0hDpq/conference.jpg')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgColor="green.500"
                bgBlendMode="overlay"
                height={['250px', '200px']}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={["100%", "100%", "300px"]} textAlign="center"
                borderRadius="15px"
                _hover={{
                    opacity: "0.5",
                    transition: "ease-in",
                    color: "skyblue"
                }}
            >
                <Heading fontWeight="bold" as="h2" >Conference</Heading>
            </Box>

        </Flex>

    )
}

export default Filter
import { Flex, Text, Button, useColorMode, useColorModeValue, Icon, Tooltip, Link, Avatar, Card } from '@chakra-ui/react'
import { NextLink } from "next/link"
import { useRouter } from 'next/router'

const Footer = () => {
    // router
    // const router = useRouter()

    return (
        <Flex justifyContent="space-around" alignItems="center" p="2" w="100%" mt="5" >
            <Text display="flex" alignItems="center" flexDirection="row" alignContent="center" justifyContent="center" fontSize={{ sm: "sm", md: "xl", lg: '2xl' }} fontWeight="bold" flexWrap="nowrap">
                <Link as={NextLink} href="/" w="fit-content" h="fit-content" textDecoration="none">
                    EventsKe
                </Link>
            </Text>

            {/* quick Links to Profile Page and Log in Page */}

            {/* link to privacy  policy webpage */}
            <Flex gap="2">
                <Text>
                    <Link as={NextLink} href="/privacy" w="fit-content" h="fit-content" textDecoration="none">
                        Privacy Policy
                    </Link>

                </Text>
            </Flex>


            <Flex gap="2">
                <Text>
                    © 2023 EventsKe
                </Text>
            </Flex>



        </Flex >
    )
}

export default Footer
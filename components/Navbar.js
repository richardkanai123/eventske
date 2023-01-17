import { Flex, Text, Button, useColorMode, useColorModeValue, Icon, Tooltip, Link } from '@chakra-ui/react'
import React from 'react'
import { GiKenya } from 'react-icons/gi'
import { BsMoonStarsFill } from 'react-icons/bs'
import { NextLink } from "next/link"
const Navbar = () => {
    const { toggleColorMode } = useColorMode()
    const color = useColorModeValue("brand.200", "brand.100")
    return (
        <Flex justifyContent="space-between" alignItems="center" p="2" w="100%" maxW="container.lg">
            <Flex>
                <Text display="flex" alignItems="center" flexDirection="row" alignContent="center" justifyContent="center" fontSize="2xl" fontWeight="bold">
                    <Link as={NextLink} href="/" w="fit-content" h="fit-content" textDecoration="none">
                        <Icon as={GiKenya} color={color} mr="2" />
                        EventsKe
                    </Link>
                </Text>
            </Flex>

            <Flex>
                <Link as={NextLink} href="/newevent" textDecoration="none">
                    <Button color={color} fontWeight="bold" variant="ghost" textDecoration="none">
                        New Event
                    </Button>
                </Link>

                {/* user profile icon */}


                <Tooltip label="Toggle Color Mode" aria-label="Toggle Color Mode">
                    <Button color={color} onClick={toggleColorMode} fontWeight="bold" variant="ghost">
                        <Icon as={BsMoonStarsFill} />
                    </Button>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default Navbar
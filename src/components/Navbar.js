import { Flex, Text, Button, useColorMode, useColorModeValue, Icon, Tooltip, Link, Avatar } from '@chakra-ui/react'
// import React, { useState } from 'react'
import { GiKenya } from 'react-icons/gi'
import { BsMoonStarsFill } from 'react-icons/bs'
import { NextLink } from "next/link"
// import { onAuthStateChanged } from "firebase/auth";
import { Auth } from '../../src/utils/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

const Navbar = () => {

    // color modes
    const { toggleColorMode } = useColorMode()
    const color = useColorModeValue("brand.200", "brand.100")

    // user state
    const [user, loading, error] = useAuthState(Auth);

    console.log(user)


    // router
    const router = useRouter()

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
                <Tooltip label="User Profile" aria-label="User Profile">
                    <Button fontWeight="bold" variant="ghost">
                        <Avatar size="sm" name={user ? user.email : "User Name"} src={(user === null) ? "https://xsgames.co/randomusers/avatar.php?g=pixel" : user.photoURL} />
                    </Button>
                </Tooltip>


                <Tooltip label="Toggle Color Mode" aria-label="Toggle Color Mode">
                    <Button color={color} onClick={toggleColorMode} fontWeight="bold" variant="ghost">
                        <Icon as={BsMoonStarsFill} />
                    </Button>
                </Tooltip>


                {/* log out Button */}
                <Tooltip label="Log Out" aria-label="Log Out">
                    {
                        user ?
                            <Button
                                onClick={() => Auth.signOut()}
                                colorScheme="blue" fontWeight="bold" variant="solid">
                                Log out
                            </Button>
                            :
                            <Button
                                // redirect to login page
                                onClick={() => router.push("/Auth/Login")}
                                colorScheme="blue" fontWeight="bold" variant="solid">
                                Log in
                            </Button>
                    }
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default Navbar
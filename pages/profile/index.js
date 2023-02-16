// profile page to show user details and the events they have created and are attending/interested in

import React, { useEffect, useState, useRef } from 'react'
import {
    Card,
    CardBody
    , Stack,
    Image,
    Text,
    Heading,
    Flex,
    Button,
    Center,
    useToast,
    HStack,
    CardFooter
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth } from '../../src/utils/Firebase'
import { useRouter } from 'next/router'
import { db } from '../../src/utils/Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { doc, deleteDoc } from "firebase/firestore";
// import { Event } from '../../src/components/Event'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { AiFillLike } from 'react-icons/ai'

const Profile = () => {

    const [user, loading] = useAuthState(Auth)
    const router = useRouter()
    const [userEvents, setUserEvents] = useState([])
    const [userLikedEvents, setUserLikedEvents] = useState([])


    // toast
    const toast = useToast()



    // on Mount, get all events from firestore and store in state
    useEffect(() => {
        // query firestore for events with the current user's uid
        FetchEvents()
    }, [user])


    // async function to fetch user events
    const FetchEvents = async () => {
        //    wait for user to load then query firestore for events with the current user's uid
        if (user) {
            const EventsRef = collection(db, "Events")

            await getDocs(EventsRef)
                .then((data) => {

                    // filter events to get only those created by the current user
                    const filteredEvents = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((event) => event.uploader === user.uid)

                    // set state to filtered events
                    setUserEvents(filteredEvents)

                    // filter all events to get only those the current user is attending or interested in if found in event Likers array
                    const LikedEvents = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((event) => event.Likers.includes(user.uid))
                    // set state to filtered events
                    setUserLikedEvents(LikedEvents)
                })
                .catch((error) => {
                    toast({
                        title: `Error ${error.code}`,
                        description: ` ${error.message}`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top'
                    })
                })

        }

    }


    if (loading) return (
        <Center>
            <Card flex="100%" w="full" h="100%">
                <CardBody>
                    <Heading as={'h1'} size={'2xl'}>Loading...</Heading>
                </CardBody>
            </Card>
        </Center>
    )

    if (user === null) return (
        <Center>
            <Card flex="100%" w="full" h="100%" >
                <CardBody>
                    <Heading as={'h1'} size={'2xl'}>You are not logged in</Heading>
                    {/* redirect to log in page */}
                    <Button onClick={
                        () => router.push('/Auth/Login')
                    }>Log in</Button>
                </CardBody>
            </Card>
        </Center>
    )


    if (user && !loading)
        return (
            <Center display="flex" flexDirection="column">
                <Flex
                    gap="10px"
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                    justify="center"
                    align="center"
                >
                    {/* user info */}
                    <Card
                        p="2"
                        w="320px"
                        h="fit"
                    >
                        <Heading as={'h1'} size={'lg'}>Profile</Heading>
                        <CardBody textAlign="center">
                            <Stack direction="column" spacing={2} align="center">
                                <Image
                                    boxSize="100px"
                                    objectFit="cover"
                                    src={
                                        user.photoURL || "https://xsgames.co/randomusers/avatar.php?g=pixel"
                                    }
                                    alt="Profile Picture"
                                    borderRadius="full"
                                />
                                <Stack>
                                    <Flex gap="2" align="center" justify="center">
                                        <Heading as={'h1'} size={'base'}>{user.displayName ? user.displayName : ""}</Heading>
                                    </Flex>
                                    <Text fontSize="sm" fontWeight="bold">{user.email}</Text>

                                </Stack>
                            </Stack>
                        </CardBody>

                    </Card>

                    {/* user events Counter */}
                    <Card
                        p="2"
                        w="320px"
                        h="fit"
                    >
                        <CardBody>
                            <Heading as="h2" size="lg" mb="3">
                                Events
                            </Heading>
                            <Stack direction="column" spacing={2} align="center">
                                <Text fontSize="md" fontWeight="bold"> Uploaded Events</Text>
                                <Text fontSize="xl" fontWeight="bold">{userEvents.length}</Text>
                            </Stack>
                            <Stack direction="column" spacing={2} align="center">
                                <Text fontSize="md" fontWeight="bold"> Upcoming Events</Text>
                                <Text fontSize="xl" fontWeight="bold">{userLikedEvents.length}</Text>
                            </Stack>
                        </CardBody>
                    </Card>
                </Flex>

                <Heading as={'h1'} size={'lg'} mb="3">Your Events</Heading>
                {/* List User Uploaded Events */}
                <Flex w="100%" display="flex" flexWrap="wrap" justify="center" align="center" gap="2">
                    {userEvents.map((event) => (
                        <Card key={event.id} p="2" w="320px" minHeight="360px" maxHeight="400px">
                            <CardBody spacing="2">
                                <Image
                                    w="100%"
                                    h="150px"
                                    objectFit="cover"
                                    src={event.eventBanner}
                                    alt="Event Banner"
                                />
                                <Heading as="h3" size="lg" mb="1">
                                    {event.eventTitle}
                                </Heading>
                                <HStack w="100%" spacing="2" align="center" justify="center">
                                    <Text fontSize="base" fontWeight="bold">{event.eventDate}</Text>
                                    <Text fontSize="base" fontWeight="bold">{event.eventTime}</Text>
                                </HStack>
                                <HStack w="100%" spacing="2" align="center" justify="center">
                                    <AiFillLike />
                                    <Text fontSize="sm">{event.Likers.length}</Text>
                                </HStack>
                                <HStack display="flex"
                                    w="100%"
                                    spacing="2"
                                    align="center"
                                    justifyContent="space-around"
                                    gap="2"
                                >
                                    <CardFooter>
                                        <NextLink href={`/eventdetails/${event.id}`} passHref>
                                            {/* <Link> */}
                                            <Button colorScheme="blue" variant="outline" size="sm">
                                                View Event
                                            </Button>
                                            {/* </Link> */}
                                        </NextLink>

                                        <Button
                                            // delete event from firestore
                                            onClick={async () => {
                                                await deleteDoc(doc(db, "Events", event.id))
                                                    .then(() => {
                                                        toast({
                                                            title: "Event Deleted",
                                                            description: "Event has been deleted",
                                                            status: "success",
                                                            duration: 1000,
                                                            isClosable: true,
                                                            position: 'top'
                                                        })
                                                        // refresh page
                                                        router.reload()
                                                    })
                                                    .catch((error) => {
                                                        toast({
                                                            title: `Error ${error.code}`,
                                                            description: ` ${error.message}`,
                                                            status: 'error',
                                                            duration: 1000,
                                                            isClosable: true,
                                                            position: 'top'
                                                        })
                                                    })
                                            }}
                                            colorScheme="red" variant="outline" size="sm">
                                            Delete Event
                                        </Button>
                                    </CardFooter>
                                </HStack>
                            </CardBody>
                        </Card>
                    ))}
                </Flex>

                {/* lists user liked events */}
                <Heading as={'h1'} size={'lg'} mb="3" mt="3">Liked Events</Heading>
                <Flex w="100%" display="flex" flexWrap="wrap" justify="center" align="center" gap="2">
                    {userLikedEvents.map((event) => (
                        <Card key={event.id} p="2" w="320px" minHeight="360px" maxHeight="400px">
                            <CardBody spacing="3">
                                <Image
                                    w="100%"
                                    h="150px"
                                    objectFit="cover"
                                    src={event.eventBanner}
                                    alt="Event Banner"
                                />
                                <Heading as="h3" size="lg" mb="2">
                                    {event.eventTitle}
                                </Heading>
                                <HStack w="100%" spacing="2" align="center" justify="center">
                                    <Text fontSize="base" fontWeight="bold">{event.eventDate}</Text>
                                    <Text fontSize="base" fontWeight="bold">{event.eventTime}</Text>
                                </HStack>
                                {/* show number of likes */}
                                <HStack w="100%" spacing="2" align="center" justify="center">
                                    <AiFillLike />
                                    <Text fontSize="sm">{event.Likers.length}</Text>
                                </HStack>
                                <HStack display="flex"
                                    w="100%"
                                    spacing="2"
                                    align="center"
                                    justifyContent="space-around"
                                    gap="2"
                                >
                                    <CardFooter>
                                        <NextLink href={`/eventdetails/${event.id}`} passHref>
                                            {/* <Link> */}
                                            <Button colorScheme="blue" variant="outline" size="sm">
                                                View Event
                                            </Button>
                                            {/* </Link> */}
                                        </NextLink>
                                    </CardFooter>
                                </HStack>
                            </CardBody>
                        </Card>
                    ))}

                </Flex>
            </Center >
        )
}

export default Profile
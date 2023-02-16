import { Card, CardBody, Stack, Image, Text, Heading, HStack, Button, Center, Badge, Flex, Box, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import DaysCounter from './DaysCounter'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth, db } from '../utils/Firebase'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { doc, updateDoc } from 'firebase/firestore'

const Event = ({ Title, EntranceFee, Venue, ImageUrl, eventID, eventDate, eventTime, Likers }) => {

    const [user, loading] = useAuthState(Auth)
    const [likersArray, setLikersArray] = useState(Likers)


    // updates the Liker array in the database
    const updateLikers = async (eventIdentifier, newLikersarray) => {
        const currentEventRef = doc(db, 'Events', eventIdentifier);
        await updateDoc(currentEventRef, {
            Likers: newLikersarray
        })
    }

    return (

        <Box w={{ sm: "300px", md: "340px" }} >
            <Link as={NextLink}
                shadow="md"
                mb="2"
                href={`/eventdetails/${eventID}`}
                w="100%"
                overflow="hidden"
                _focus={{
                    boxShadow: 'none',
                }}
                opacity="0.8"
                _hover={{
                    textDecoration: 'none',
                    opacity: '1',
                    shadow: 'xl',
                    rounded: 'lg',
                    boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 10px #0ff, 0 0 15px #0ff, 0 0 10px #0ff, 0 0 25px #0ff, 0 0 15px #0ff',
                    // bgGradient: "linear(to-r, #7928CA, #FF0080)",

                }}
                passHref
            >
                <Center>
                    <Card flex="100%" w="full" h="100%" >
                        <CardBody>
                            <Image
                                src={ImageUrl}
                                alt={Title}
                                borderRadius='lg'
                                w='100%'
                                h='220px'
                                loading="lazy"
                            />
                            <Stack mt='4' spacing='3'>
                                <Heading size='md'>{Title}</Heading>
                                <DaysCounter setDate={eventDate} setTime={eventTime} />
                                <HStack spacing="4" align="center" justify="space-around">
                                    <Text color='blue.600' fontSize='md'>
                                        Entrance: {EntranceFee === "free" ? <Badge fontSize='xs' colorScheme='green'>
                                            Free
                                        </Badge> : `Ksh ${EntranceFee}`}
                                    </Text>
                                    <Text color='blue.600' fontSize='md'>
                                        Venue: {Venue}
                                    </Text>

                                </HStack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Center>
            </Link>

            {
                (user && !loading) && (
                    <HStack gap="3">
                        {/* reaction button: shows like or dislike depending on Likers array */}
                        <Button
                            // colorScheme="blue"
                            variant="ghost"
                            size="sm"
                            leftIcon={likersArray.includes(user.uid) ? <AiFillDislike /> : <AiFillLike />}
                            onClick={() => {
                                if (likersArray.includes(user.uid)) {
                                    // remove the user from the likers array
                                    const newLikersArray = likersArray.filter((liker) => liker !== user.uid)
                                    setLikersArray(newLikersArray)
                                    updateLikers(eventID, newLikersArray)
                                } else {
                                    // add the user to the likers array
                                    const newLikersArray = [...likersArray, user.uid]
                                    setLikersArray(newLikersArray)
                                    updateLikers(eventID, newLikersArray)
                                }
                            }
                            }
                        >
                        </Button>
                        <Text
                            as="p"
                            fontSize="xl"
                            color="gray.600"
                            ml="auto"
                            alignSelf="right"
                        >
                            {likersArray.length > 0 ? likersArray.length : 0}
                        </Text>

                    </HStack>
                )
            }
        </Box >
    )
}

export default Event


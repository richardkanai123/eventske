import { Card, CardBody, Stack, Image, Text, Heading, HStack, Button, Center } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import DaysCounter from './DaysCounter'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth } from '../utils/Firebase'
import { AiFillLike } from 'react-icons/ai'

const Event = ({ Title, EntranceFee, Venue, ImageUrl, eventID, eventDate, eventTime }) => {

    const [user, loading] = useAuthState(Auth)

    return (

        <Link as={NextLink}
            shadow="md"
            href={`/eventdetails/${eventID}`}
            w={{ sm: "300px", md: "340px" }}
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
                            <HStack spacing="5" align="center" justify="space-around">
                                <Text color='blue.600' fontSize='md'>
                                    Entrance: {EntranceFee}
                                </Text>
                                <Text color='blue.600' fontSize='md'>
                                    Venue: {Venue}
                                </Text>
                                {/* Like Button to be used in showing interest in the event */}
                                {
                                    (user) &&
                                    <Button variant="ghost" fontSize="xl" fontWeight="bold" alignSelf="end" color="gray.600">
                                        <AiFillLike />
                                    </Button>
                                }
                            </HStack>
                        </Stack>
                    </CardBody>
                </Card>
            </Center>
        </Link>
    )
}

export default Event


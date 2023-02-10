import { Card, CardBody, Stack, Image, Text, Heading, HStack, Button, Center } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import DaysCounter from './DaysCounter'

const Event = ({ Title, EntranceFee, Venue, ImageUrl, eventID, eventDate, eventTime }) => {
    return (

        <Link as={NextLink} href={`/eventdetails/${eventID}`} w={{ base: "100%", md: "380px" }} h="fit-content"
            _hover={{
                textDecoration: 'none',
                opacity: '0.9',
                shadow: '2xl',
            }}
            passHref
        >
            <Center>
                <Card maxW='sm' flex="100%">
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
                                {/* <Button variant="ghost" fontSize="xl" fontWeight="bold" alignSelf="end" color="gray.600">
                            <AiFillLike />
                        </Button> */}
                            </HStack>
                        </Stack>
                    </CardBody>
                </Card>
            </Center>
        </Link>


    )
}

export default Event


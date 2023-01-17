import { Card, CardBody, Stack, Image, Text, Heading, HStack, Button } from '@chakra-ui/react'
import React from 'react'
import { AiFillLike } from 'react-icons/ai'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

const Event = ({ Title, EntranceFee, Venue, ImageUrl, eventID }) => {
    return (

        <Link as={NextLink} href={`/eventdetails/${eventID}`} w="fit-content" h="fit-content"
            _hover={{
                textDecoration: 'none',
                opacity: '0.9',
                shadow: '2xl',
            }}
            passHref
        >
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
                        <Text>
                            Time Counter TBI
                        </Text>
                        <HStack spacing="5" align="center" justify="space-around">
                            <Text color='blue.600' fontSize='md'>
                                Entrance: {EntranceFee}
                            </Text>
                            <Text color='blue.600' fontSize='md'>
                                City: {Venue}
                            </Text>
                            {/* Like Button to be used in showing interest in the event */}
                            {/* <Button variant="ghost" fontSize="xl" fontWeight="bold" alignSelf="end" color="gray.600">
                            <AiFillLike />
                        </Button> */}
                        </HStack>
                    </Stack>
                </CardBody>
            </Card>
        </Link>


    )
}

export default Event


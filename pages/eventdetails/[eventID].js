import { Box, Center, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
// import { AiOutlineFieldTime } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { GiClothes } from 'react-icons/gi'
import { FcConferenceCall } from 'react-icons/fc'
import { FcManager, FcCalendar, FcOvertime } from 'react-icons/fc'
import { BsFillTelephoneForwardFill } from 'react-icons/bs'
import { FaMoneyBillWave } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { doc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from '../../utils/Firebase'

// idetifier for the event using id 
export const getStaticPaths = async () => {
    // fetch events from firebase and return them as props
    const eventsCollection = collection(db, 'Events');
    const entries = await getDocs(eventsCollection);
    const paths = entries.docs.map((entry) => {
        return {
            params: { eventID: entry.id.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

// specific render
export const getStaticProps = async (context) => {
    const id = context.params.eventID
    const docRef = doc(db, "Events", id)
    const entries = await getDoc(docRef)
    const data = ({ id: entries.id, ...entries.data() })
    const parsedData = JSON.parse(JSON.stringify(data))
    return {
        props: { EventData: parsedData }
    }
}


// {
//     eventTitle: '',
//         eventDescription: '',
//             eventCity: '',
//                 eventVenue: '',
//                     eventDate: '',
//                         eventTime: '',
//                             eventEntranceFee: false,
//                                 eventFee: 0,
//                                     eventCategory: '',
//                                         eventDressCode: '',
//                                             eventOrganizer: '',
//                                                 eventOrganizerPhone: '',
//                                                     eventOrganizerEmail: '',
//                                                         eventBookingSite: '',
// }


const EventDetails = ({ EventData }) => {

    return (
        <Center w="100%">
            <Flex w="100%" direction="column" align="center" justify="center" p="1" textAlign="left" >
                <Image src={EventData.eventBanner} alt={EventData.eventTitle}
                    w={{ base: "100%", md: "90%", lg: "100%" }}
                    h={{ base: "320px", md: "500px", lg: "400px" }}
                    objectFit="cover"
                    boxShadow="lg"
                    loading="lazy"

                />
                <Heading alignSelf="start" as="h3" size="2xl" mt="4" textAlign="center" px="3">
                    {EventData.eventTitle}
                </Heading>
                <Heading display="flex" gap="10px" alignSelf="start" as="h4" size="lg" mt="3" textAlign="center" px="3">
                    <GoLocation /> {EventData.eventCity}
                </Heading>

                <Flex w="100%" mt="4" p="2" alignItems="center" gap="20px" flexDirection={{ base: "column", lg: "row" }} justify="center" alignContent="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
                    {/* description */}
                    <Text as="p" w={{ base: "100%", lg: "49%" }} fontSize="lg" fontWeight="semibold" letterSpacing="1px" mt="2" lineHeight="2" p="2" textAlign="justify">
                        {EventData.eventDescription}
                    </Text>

                    {/* event details */}
                    <Flex justify={{ base: "center", md: "space-around" }} wrap="wrap" alignSelf="center" p="2" w={{ base: "100%", lg: "49%" }} mt="2" gap="10px" alignContent="center">
                        <VStack shadow="md" p="3" mt="4" rounded="sm" spacing="4" minW={{ sm: "100%", md: "fit-content" }}  >
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%" >
                                <FcOvertime />10:00 AM
                            </Heading>
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%">
                                <FcCalendar />  2022-11-15
                            </Heading>
                        </VStack>

                        <VStack shadow="md" p="3" mt="4" rounded="sm" spacing="4" w={{ sm: "90%", md: "fit-content" }}  >
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%"
                            >
                                <FcConferenceCall /> {EventData.eventCategory}
                            </Heading>
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%">
                                <GiClothes /> {EventData.eventDressCode}
                            </Heading>
                        </VStack>

                        <VStack shadow="md" p="3" mt="4" rounded="sm" spacing="4" w={{ sm: "90%", md: "fit-content" }}  >
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%"
                            >
                                <FcManager /> {EventData.eventOrganizer}
                            </Heading>
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%">
                                <a href={EventData.eventOrganizerPhone} target="_blank" nonreffer="true" ><BsFillTelephoneForwardFill /> {EventData.eventOrganizer}</a>
                            </Heading>
                        </VStack>

                        <VStack shadow="md" p="3" mt="4" rounded="sm" spacing="4" w={{ sm: "90%", md: "fit-content" }}  >
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%"
                            >
                                <FaMoneyBillWave /> Entrance Fee:Ksh.{EventData.eventFee === 0 ? "free" : EventData.eventFee}
                            </Heading>
                            <Heading display="flex" alignItems="center" justifyContent="center" gap="10px" alignSelf="start" as="h4" mt="2" size="md" textAlign="center" w="100%">
                                {/* <a href="https://www.techinnovators.com" target="_blank">
                                <FiExternalLink />
                                {EventData.eventWebsite}

                            </a> */}

                                Website Here
                            </Heading>
                        </VStack>
                    </Flex>
                </Flex>

            </Flex>

        </Center >

    )
}

export default EventDetails

import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import { collection, getDocs, orderBy } from 'firebase/firestore'
import Head from 'next/head'
import Banner from '../src/components/Banner'
import Event from '../src/components/Event'
import { db } from '../src/utils/Firebase'


export const getStaticProps = async () => {
  // fetch events from firebase and return them as props
  const eventsCollection = collection(db, 'Events');
  // ordered by eventDateTimeStamp in ascending order
  const entries = await getDocs(eventsCollection, orderBy("eventDateTimeStamp", "desc"))
  const entriesData = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data()
  }))

  return {
    props: { data: JSON.stringify(entriesData) }
  }
}


export default function Home({ data }) {

  return (
    <>
      <Head>
        <title>EventsKe</title>
        <meta name="description" content="Kenya's best Events Listing Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center as="div" w="100%">
        <Flex w="100%" direction="column" alignItems="center" justify="center" align="center" alignContent="center">
          <Banner />
          <Heading as="h3" my="10">Upcoming Events</Heading>
          {/* upcoming events wrapper */}
          <Center w="100%">
            <Flex mt="5" justify="center" wrap="wrap" align="center" items="center" gap="10px" w="100%" pt="2" pb="3">
              {/* lists all events into cards */}
              {
                data?.length > 0 &&
                JSON.parse(data).map((event) => (
                  <Event key={event.id}
                    eventID={event.id}
                    Title={event.eventTitle}
                    EntranceFee={event.eventFee === 0 ? "free" : event.eventFee}
                    Venue={event.eventCity}
                    eventDate={event.eventDate}
                    ImageUrl={event.eventBanner}
                    eventTime={event.eventTime}

                  />
                ))
              }
            </Flex>
          </Center>


        </Flex>
      </Center>
    </>
  )
}

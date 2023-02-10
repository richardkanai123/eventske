import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Text, Box, Button, Divider, Flex, Heading, Stack, Checkbox, Center } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Select,
    InputGroup,
    InputLeftElement,
    InputLeftAddon,
    useToast
} from '@chakra-ui/react'
import { AiFillMail } from 'react-icons/ai'
import * as Yup from 'yup'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from '../../src/utils/Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'


const NewEvent = () => {
    const [entrance, SetEntrance] = useState(false)
    const [eventCover, setEventCover] = useState({})



    // toast for success and error
    const toast = useToast()

    const UploadImageToFirebase = async (file) => {

        // root ref
        const storageRef = ref(storage, `EventCovers/${values.eventTitle}+ CoverPhoto`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');

                toast({
                    title: `Uploading at ${progress} %`,
                    description: "Please wait for the upload to complete",
                    status: "loading",
                    isClosable: "false",
                    duration: 5000,
                    position: "top",
                    variant: "solid"
                })

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                // console.log(error);
                // error toast
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    isClosable: "true",
                    duration: 5000
                })
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    UploadEventToFirestore(downloadURL)

                });
            }

        );
    }



    // take image url and upload all values and the url to firestore
    const UploadEventToFirestore = async (url) => {
        try {
            await (addDoc(collection(db, "Events"), {
                eventBanner: url,
                eventTitle: values.eventTitle,
                eventDescription: values.eventDescription,
                eventCity: values.eventVenue,
                eventDate: values.eventDate,
                eventTime: values.eventTime,
                eventFee: values.eventFee,
                eventCategory: values.eventCategory,
                eventDressCode: values.eventDressCode,
                eventOrganizer: values.eventOrganizer,
                eventOrganizerPhone: values.eventOrganizerPhone,
                eventOrganizerEmail: values.eventOrganizerEmail,
                eventBookingSite: values.eventBookingSite,
                eventDateCreated: Timestamp.now(),
                eventDateTimeStamp: Timestamp.fromDate(new Date(values.eventDate))

            })
            );
            // success toast
            toast({
                title: "Event Added!👍",
                description: "Your Event has been added successfully",
                status: "success",
                isClosable: "true",
                duration: 3000

            })
            // clear the form
            resetForm()
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Error Occured, Please Try Again",
                status: "error",
                isClosable: "true",
                duration: 5000
            })
            // clear the form
            resetForm()
        }
    }

    const schema = Yup.object().shape({
        eventTitle: Yup.string().min(10, "Too Short").required('Required'),
        eventDescription: Yup.string().min(100, 'Too Short! Must be above 100 characters').required('Required'),
        eventCity: Yup.string().required('Required'),
        eventVenue: Yup.string().required('Required'),
        eventDate: Yup.date().required('Required').min(new Date(), 'Date must be in the future'),
        eventTime: Yup.string().required('Required'),
        eventEntranceFee: Yup.boolean().required('Required'),
        eventFee: Yup.number().integer().min(0, "Must be a positive integer>0").when('eventEntranceFee', {
            is: true,
            then: Yup.number().required('Required')
        }),
        eventCategory: Yup.string().required('Required'),
        eventDressCode: Yup.string().required('Required'),
        eventOrganizer: Yup.string().required('Required'),
        eventOrganizerPhone: Yup.number().required('Required'),
        eventOrganizerEmail: Yup.string().email('Invalid email address').required('Required'),
        eventBookingSite: Yup.string().url('Must be a valid URL'),
    })


    // submit form
    const onSubmit = (values) => {
        UploadImageToFirebase(eventCover)
    }

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm } = useFormik({
        initialValues: {
            eventTitle: '',
            eventDescription: '',
            eventCity: '',
            eventVenue: '',
            eventDate: '',
            eventTime: '',
            eventEntranceFee: false,
            eventFee: 0,
            eventCategory: '',
            eventDressCode: '',
            eventOrganizer: '',
            eventOrganizerPhone: '',
            eventOrganizerEmail: '',
            eventBookingSite: '',
        },
        validationSchema: schema,
        onSubmit
    })




    return (
        <Box w="100%" p="2">
            <Box w="100%" mx="auto" p="2" boxShadow="lg" borderRadius="lg">
                <Heading as="h4" size="lg" textAlign="center" p="2">Create New Event</Heading>
                <Divider />
                <Box w="100%" p="2" mt="4">
                    <form onSubmit={handleSubmit} w="100%">
                        <Flex w="100%" gap="2" justify="space-around" direction={{ base: "column", md: "row" }}>
                            <Flex w={{ base: "100%", md: "49%" }} direction="column" gap="3" p="2">
                                {/* Event Banner */}
                                <FormControl id="eventBanner" isRequired>
                                    <FormLabel>Event Banner</FormLabel>
                                    <Input type="file"
                                        accept='image/*'
                                        onChange={(e) => {
                                            setEventCover(e.target.files[0])
                                        }}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Event Banner"
                                        p="2"
                                        required
                                    />
                                </FormControl>


                                <FormControl id="eventTitle" >
                                    <FormLabel>Event Title</FormLabel>
                                    <Input type="text"
                                        name="eventTitle"
                                        value={values.eventTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Event Title"
                                        p="2"
                                        isInvalid={errors.eventTitle && touched.eventTitle}

                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventTitle && touched.eventTitle ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventTitle}</Text>
                                    ) : null}
                                </FormControl>
                                <FormControl id="eventCity" >
                                    <FormLabel>Event City</FormLabel>
                                    <Input type="text"
                                        name="eventCity"
                                        value={values.eventCity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Event City"
                                        p="2"
                                        isInvalid={errors.eventCity && touched.eventCity}

                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventCity && touched.eventCity ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventCity}</Text>
                                    ) : null}
                                </FormControl>

                                <FormControl id="eventVenue" >
                                    <FormLabel>Event Venue</FormLabel>
                                    <Input type="text"
                                        name="eventVenue"
                                        value={values.eventVenue}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Venue Details eg. Address, Landmark, etc"
                                        p="2"
                                        isInvalid={errors.eventVenue && touched.eventVenue}

                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventVenue && touched.eventVenue ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventVenue}</Text>
                                    ) : null}
                                </FormControl>

                                <FormControl id="eventDescription" >
                                    <FormLabel>Event Description</FormLabel>
                                    <Textarea type="text"
                                        name="eventDescription"
                                        value={values.eventDescription}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Enter Event Description Here"
                                        size="md"
                                        p="4"
                                        isInvalid={errors.eventDescription && touched.eventDescription}
                                        minH="200px"

                                    >
                                    </Textarea>
                                    {/* displayed in case of errors */}
                                    {errors.eventDescription && touched.eventDescription ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventDescription}</Text>
                                    ) : null}
                                </FormControl>


                                <Divider mt="2" />

                                <Text>Event Time and Date Details</Text>
                                <InputGroup display="flex" spacing="10px">

                                    <FormControl id="eventDate" >
                                        <FormLabel>Event Date</FormLabel>
                                        <Input type="date"
                                            name="eventDate"
                                            value={values.eventDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="flushed"
                                            placeholder="Event Date"
                                            p="2"
                                            isInvalid={errors.eventDate && touched.eventDate}
                                        />
                                        {/* displayed in case of errors} */}
                                        {errors.eventDate && touched.eventDate ? (
                                            <Text color="red.500" fontWeight="hairline" >{errors.eventDate}</Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl id="eventTime" >
                                        <FormLabel>Event Time</FormLabel>
                                        <Input type="time"
                                            name="eventTime"
                                            value={values.eventTime}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="flushed"
                                            placeholder="Event Time"
                                            p="2"
                                            isInvalid={errors.eventTime && touched.eventTime}
                                        />
                                        {
                                            errors.eventTime && touched.eventTime ? (
                                                <Text color="red.500" fontWeight="hairline" >{errors.eventTime}</Text>
                                            ) : null
                                        }
                                    </FormControl>
                                </InputGroup>


                            </Flex>
                            <Flex w={{ base: "100%", md: "49%" }} direction="column" p="2">
                                <InputGroup spacing="10px">
                                    <FormControl display='flex' alignItems='center'>
                                        <FormLabel htmlFor='Entrance' mb='0'>
                                            Entrance
                                        </FormLabel>
                                        <Checkbox size='md'

                                            onChange={() => {

                                                SetEntrance((prev) => !prev)
                                                values.eventEntranceFee = entrance
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            Paid
                                        </Checkbox>

                                        {entrance ? (
                                            <FormControl id="eventFee" mt="4"  >
                                                <FormLabel textAlign="left">Entrance Fee</FormLabel>
                                                <InputGroup display="flex" gap="20px">
                                                    <InputLeftElement pointerEvents='none'
                                                        color='gray.300'
                                                        fontSize='1.2em'
                                                        children='Ksh.' />
                                                    <Input type="number"
                                                        name="eventFee"
                                                        value={values.eventFee}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        variant="flushed"
                                                        placeholder="Fee"
                                                        p="2"
                                                        mx="10"
                                                        isInvalid={errors.eventFee && touched.eventFee}

                                                    /></InputGroup>
                                                {

                                                    errors.eventFee && touched.eventFee ? (
                                                        <Text color="red.500" fontWeight="hairline" >{errors.eventFee}</Text>
                                                    ) : null
                                                }
                                            </FormControl>
                                        ) : null}
                                    </FormControl>
                                </InputGroup>

                                {/* event category selection */}
                                <FormControl id="eventCategory" >
                                    <FormLabel>Event Category</FormLabel>
                                    <Select
                                        name="eventCategory"
                                        value={values.eventCategory}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Select Event Category"
                                        p="2"
                                        isInvalid={errors.eventCategory && touched.eventCategory}
                                    >
                                        <option value="Music">Music</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Comedy">Comedy</option>
                                        <option value="Concerts">Concerts</option>
                                        <option value="Conferences">Conferences</option>
                                        <option value="Festivals">Festivals</option>
                                        <option value="Film">Film</option>
                                        <option value="Meetup">Meetup</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Party">Party</option>
                                        <option value="Launch">Launch</option>
                                        <option value="Pool Party">Pool Party</option>
                                        <option value="House Party">House Party</option>
                                        <option value="Birthday Party">Birthday Party</option>
                                        <option value="Team Building">Team Building</option>
                                        <option value="Camping">Camping</option>
                                        <option value="Game Drive">Game Drive</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                    {/* displayed in case of errors */}
                                    {errors.eventCategory && touched.eventCategory ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventCategory}</Text>
                                    ) : null}
                                </FormControl>

                                { /* event eventDressCode */}
                                <FormControl id="eventDressCode" >
                                    <FormLabel>Event Dress Code</FormLabel>
                                    <Select
                                        name="eventDressCode"
                                        value={values.eventDressCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Select Event Dress Code"
                                        p="2"
                                        isInvalid={errors.eventDressCode && touched.eventDressCode}
                                    >
                                        <option value="Casual">Casual</option>
                                        <option value="Formal">Formal</option>
                                        <option value="Smart Casual">Smart Casual</option>
                                        <option value="Business Casual">Business Casual</option>
                                        <option value="All Red">All Red</option>
                                        <option value="All White">All White</option>
                                        <option value="All Black">All Black</option>
                                        <option value="All Purple">All Purple</option>
                                        <option value="Kitenge">Kitenge</option>
                                        <option value="Free Style">Free Style</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                    {/* displayed in case of errors */}
                                    {errors.eventDressCode && touched.eventDressCode ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventDressCode}</Text>
                                    ) : null}
                                </FormControl>

                                {/* Event Organizer */}
                                <FormControl id="eventOrganizer" >
                                    <FormLabel>Event Organizer</FormLabel>
                                    <Input type="text"

                                        name="eventOrganizer"
                                        value={values.eventOrganizer}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="flushed"
                                        placeholder="Event Organizer Name"
                                        p="2"
                                        isInvalid={errors.eventOrganizer && touched.eventOrganizer}
                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventOrganizer && touched.eventOrganizer ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventOrganizer}</Text>
                                    ) : null}
                                </FormControl>

                                {/* Event Organizer Phone */}
                                <FormControl id="eventOrganizerPhone" >
                                    <FormLabel>Event Organizer Phone</FormLabel>
                                    <Input type="tel"
                                        value={values.eventOrganizerPhone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="eventOrganizerPhone"
                                        variant="flushed"
                                        placeholder="Organizer Phone Number"
                                        p="2"
                                        isInvalid={errors.eventOrganizerPhone && touched.eventOrganizerPhone}
                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventOrganizerPhone && touched.eventOrganizerPhone ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventOrganizerPhone}</Text>
                                    ) : null}
                                </FormControl>

                                {/* Event Organizer Email */}
                                <FormControl id="eventOrganizerEmail" >
                                    <FormLabel>Event Organizer Email</FormLabel>
                                    <Input type="email"
                                        value={values.eventOrganizerEmail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="eventOrganizerEmail"
                                        variant="flushed"
                                        placeholder="Organizer Email Address"
                                        p="2"
                                        isInvalid={errors.eventOrganizerEmail && touched.eventOrganizerEmail}
                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventOrganizerEmail && touched.eventOrganizerEmail ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventOrganizerEmail}</Text>
                                    ) : null}
                                </FormControl>

                                {/* Event Organizer Website */}
                                <FormControl id="eventBookingSite" >
                                    <FormLabel>Event Organizer Website</FormLabel>
                                    <Input type="url"
                                        value={values.eventBookingSite}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="eventBookingSite"
                                        variant="flushed"
                                        placeholder="Organizer Website"
                                        p="2"
                                        isInvalid={errors.eventBookingSite && touched.eventBookingSite}
                                    />
                                    {/* displayed in case of errors */}
                                    {errors.eventBookingSite && touched.eventBookingSite ? (
                                        <Text color="red.500" fontWeight="hairline" >{errors.eventBookingSite}</Text>
                                    ) : null}
                                </FormControl>
                            </Flex>

                        </Flex>
                        {/* submit button */}
                        <Center>
                            <Button type="submit" colorScheme="teal" mt="6" size="lg" minW="250px" onClick={handleSubmit}>Submit</Button>
                        </Center>
                    </form>
                </Box>
            </Box>
        </Box >
    )

}

export default NewEvent

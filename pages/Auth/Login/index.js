import { Box, Button, Center, Divider, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../../../src/utils/Firebase'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Login = () => {

    // router
    const router = useRouter()
    // toast alert
    const toast = useToast()

    const handleLogInWithEmailandPassword = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(Auth, values.useremail, values.userpassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast({
                    title: 'Logged in.',
                    description: `Welcome ${user.email}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })

                router.replace('/')
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
            });

    }

    // validation with yup
    const schema = Yup.object().shape({
        useremail: Yup.string().email("Enter Valid Email").required('Required!'),
        userpassword: Yup.string().required("Required").min(8),
    })

    const { handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            useremail: '',
            userpassword: ''
        },
        validationSchema: schema,
        handleLogInWithEmailandPassword
    })


    const handleLogInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(Auth, provider)
            .then((result) => {
                toast({
                    title: 'Logged in',
                    description: `Welcome ${result.user.displayName}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })

                router.replace('/')
            }).catch((error) => {
                toast({
                    title: `Error ${error.code}`,
                    description: ` ${error.message}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })
            });
    }


    return (
        <Box w="100%" as='div' display="flex" flexDirection="column" align="center" justify="center">
            <Center>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">Log in</Text>
            </Center>

            {/* Create Account Form */}
            <form w="100%" bg="gray.300">
                <VStack gap="10px">
                    <Input w="300px"
                        type="email"
                        placeholder="Email"
                        name='useremail'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        _invalid={errors.useremail && touched.useremail ? true : false}
                    />
                    {errors.useremail && touched.useremail ? (
                        <Text color="red.500" fontSize="sm">{errors.useremail}</Text>
                    ) : null}
                    <Input w="300px"
                        type="password"
                        placeholder="password"
                        name='userpassword'
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {
                        errors.userpassword && touched.userpassword ? (
                            <Text color="red.500" fontSize="sm">{errors.userpassword}</Text>
                        ) : null
                    }
                    <Button
                        onClick={handleLogInWithEmailandPassword}
                        w="200px"
                        fontWeight="bold"
                        type="submit"
                        colorScheme="blue"
                    >Log In</Button>
                </VStack>
                <Divider mt="4" mb="4" w="300px" />

                <Center>
                    <Text fontSize="xl" fontWeight="bold">Or</Text>
                </Center>

            </form>

            <Center mt="4" display="flex" flexDirection="column">
                <Button onClick={handleLogInWithGoogle} bg="blue.600" fontWeight="bold" display="flex" alignItems="center" gap=
                    "20px" fontSize="xl" rounded="md" p="4">
                    <FcGoogle />
                    Log in with Google
                </Button>

                {/* new user */}
                <Text mt="4" fontSize="xl" fontWeight="bold">New User?</Text>
                <Button onClick={() => router.push('/Auth/Signup')} colorScheme="blue" fontWeight="bold" display="flex" alignItems="center" gap=
                    "20px" fontSize="xl" rounded="md" p="4">
                    Sign Up
                </Button>
            </Center>
        </Box >
    )
}

export default Login
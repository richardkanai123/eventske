import { Box, Button, Center, Divider, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../../../src/utils/Firebase'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
    const [submitError, setSubmitError] = useState(false)
    // toast alert
    const toast = useToast()

    // router
    const router = useRouter()

    // create account with Google 
    const handleSignUpWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(Auth, provider)
            .then((result) => {
                toast({
                    title: 'Account created.',
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


    // create account using email and user password
    const handleSignUpWithEmailandPassword = (e) => {
        e.preventDefault();

        if (values.password != values.c_password) {
            setSubmitError(true)
            return false;
        }
        if (values.password === values.c_password) {
            createUserWithEmailAndPassword(Auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed in 
                    toast({
                        title: 'Account created.',
                        description: `Welcome ${userCredential.user.email}`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top'
                    })

                    router.push('/')
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

                    resetForm()
                });

        }
    }


    // validation with yup
    const schema = Yup.object().shape({
        email: Yup.string().email("Enter Valid Email").required('Required!'),
        password: Yup.string().required("Required").min(8),
        c_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("required")
    })


    // formik
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm } = useFormik({
        initialValues: {
            email: '',
            password: '',
            c_password: ''
        },
        validationSchema: schema,
        handleSignUpWithEmailandPassword
    })

    return (
        <Box w="100%" as='div' display="flex" flexDirection="column" align="center" justify="center">
            <Center>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">New User</Text>
            </Center>

            {/* Create Account Form */}
            <form onSubmit={handleSubmit} w="100%" bg="gray.300">
                <VStack gap="10px">
                    {/* <Input w="300px" type="text" placeholder="Username" /> */}
                    <Input w="300px"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        placeholder="Email"
                        name='email'
                        isInvalid={errors.email && touched.email}
                    />
                    {errors.email && touched.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}

                    <Input
                        w="300px"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="password"
                        name='password'
                        isInvalid={errors.password && touched.password}
                    />

                    {errors.password && touched.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
                    <Input w="300px"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="confirm password" name="c_password"
                        isInvalid={errors.c_password && touched.c_password} />

                    {errors.c_password && touched.c_password && <Text color="red.500" fontSize="sm">{errors.c_password}</Text>}
                    <Button
                        onClick={handleSignUpWithEmailandPassword}
                        // isLoading={submitError}
                        bg="blue.600"
                        w="200px"
                        fontWeight="bold"
                        type="submit">
                        Create Account
                    </Button>
                </VStack>
                <Divider mt="4" mb="4" w="300px" />
            </form>

            <Center mt="4">
                <Button onClick={handleSignUpWithGoogle}
                    bg="blue.600" fontWeight="bold" display="flex" alignItems="center" gap=
                    "20px" fontSize="xl" rounded="none" p="4"
                // disabled if submit error exist

                >
                    <FcGoogle />
                    Sign Up with Google
                </Button>
            </Center>
        </Box >
    )
}

export default Login
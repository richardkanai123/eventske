import { Box, Button, Center, Divider, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth } from '../../../src/utils/Firebase'
import { useRouter } from 'next/router'

const Login = () => {

    // router
    const router = useRouter()
    // toast alert
    const toast = useToast()



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

    const handleLogInWithEmailandPassword = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast({
                    title: 'Logged in.',
                    description: `Welcome ${result.user.displayName}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })
                // ...
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
    return (
        <Box w="100%" as='div' display="flex" flexDirection="column" align="center" justify="center">
            <Center>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">Log in</Text>
            </Center>

            {/* Create Account Form */}
            <form w="100%" bg="gray.300">
                <VStack gap="10px">
                    <Input w="300px" type="email" placeholder="Email" />
                    <Input w="300px" type="password" placeholder="password" />
                    <Button onClick={handleLogInWithEmailandPassword} bg="blue.600" w="200px" fontWeight="bold" type="submit"
                    >Log In</Button>
                </VStack>
                <Divider mt="4" mb="4" w="300px" />
            </form>

            <Center mt="4">
                <Button onClick={handleLogInWithGoogle} bg="blue.600" fontWeight="bold" display="flex" alignItems="center" gap=
                    "20px" fontSize="xl" rounded="md" p="4">
                    <FcGoogle />
                    Log in with Google
                </Button>
            </Center>
        </Box >
    )
}

export default Login
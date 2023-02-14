import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const index = () => {
    return (
        <Flex flexDir="column" p="3" textAlign="justify">

            <Text as="h1" fontSize="2xl" fontWeight="bold" mb="2">Privacy Policy</Text>
            <Text as="p" fontSize="md" fontWeight="normal" mb="2">Last updated: 2023-01-01</Text>

            <Text as="p" fontSize="md" fontWeight="normal" mb="2">This Privacy Policy describes how we collect, use, and disclose information about you when you visit our website or use our services.
            </Text>

            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">Information We Collect</Text>
            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                We collect information that you provide to us directly, such as your name, email address, and phone number. We also collect information about your use of our website and services automatically, such as your IP address, browser type, and the pages you visit.
            </Text>

            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">How We Use Your Information</Text>

            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                We use your information to provide and improve our services, to communicate with you, and to personalize your experience on our website. We may also use your information for research and analytics purposes.
            </Text>

            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">How We Share Your Information</Text>
            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                We may share your information with third-party service providers who help us to provide and improve our services. We may also share your information with law enforcement or other government agencies if required by law.
            </Text>


            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">Your Rights, Your Choices</Text>
            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                You may have certain rights and choices regarding your information. For example, you may be able to opt out of receiving marketing emails from us. You may also be able to access and update your information. If you have any questions about your rights or choices, please contact us at [contact email].

                You can choose to opt-out of receiving marketing communications from us. You can also choose to disable cookies in your browser settings, although this may limit your ability to use certain features of our website.
            </Text>

            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">Security</Text>

            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                We take reasonable measures to help protect your information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                We take reasonable measures to protect your information from unauthorized access, disclosure, and use. However, no security measures are completely foolproof, so we cannot guarantee the security of your information.
            </Text>

            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">Changes to Our Privacy Policy</Text>

            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                We may change this Privacy Policy from time to time. If we make any material changes, we will notify you by email or by means of a notice on our website prior to the change becoming effective. We encourage you to review this Privacy Policy periodically to stay informed about our information practices and the choices available to you.
            </Text>

            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">
                Contact Us
            </Text>

            <Text as="p" fontSize="md" fontWeight="normal" mb="2">
                If you have any questions or concerns about our Privacy Policy, please contact us at [contact email].
            </Text>
        </Flex>
    )
}

export default index
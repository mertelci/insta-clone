import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import Authform from '../../components/AuthForm/Authform'

function AuthPage() {
    return (

        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>

                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    {/* left */}
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="/auth.png" h={650} alt='Phone img' />
                    </Box>
                    {/*Right */}

                    <VStack spacing={5} align={"stretch"}>

                        <Authform />
                        <Box fontWeight={400} fontSize={14} textAlign={"center"}>Get the app.</Box>
                        <Flex gap={3} justifyContent={"center"}>
                            <Image src="playstore.png" h={10} alt='Playstore logo' />
                            <Image src="microsoft.png" h={10} alt='Microsoft logo' />

                        </Flex>
                    </VStack>
                </Flex>


            </Container >
        </Flex >
    )
}

export default AuthPage
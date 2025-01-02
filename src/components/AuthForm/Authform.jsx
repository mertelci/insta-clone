import { Box, Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import GoogleAuth from './GoogleAuth';

function Authform() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
            <Box padding={2}>
                <VStack spacing={3}>
                    <Image src="Instagram-Wordmark-White-Logo.wine.png" h={40} cursor={"pointer"} alt='Instagram' />


                    {isLogin ? <Login /> : <SignUp />}


                    {/*OR */}
                    <Flex alignItems={"center"} justifyContent={"center"} my={2} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.700"} />
                        <Text mx={2} color={"gray.500"} fontWeight={600} fontSize={"12"}>OR</Text>
                        <Box flex={2} h={"1px"} bg={"gray.700"} />
                    </Flex>
                    {/* Google */}
                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
                </VStack>
            </Box>

            <Box borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14} fontWeight={400}>
                        {isLogin ? "Don't have account?" : "Already have an account."}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={"pointer"} fontWeight={600} fontSize={"14px"}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex >
            </Box >
        </>




    )
}

export default Authform
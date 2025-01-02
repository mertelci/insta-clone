import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom"
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/AuthStore'
function SuggestedHeader() {
    const { handleLogout, isLoggingout } = useLogout()
    const authUser = useAuthStore((state) => state.user);
    if (!authUser) return null;

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mb={2} >

            <Flex gap={2} alignItems={"center"}>


                <Link to={`${authUser.username}`}> <Avatar size={"md"} src={authUser.profilePicURL} /></Link>

                <Box>
                    <Link to={`${authUser.username}`}>
                        <Text fontSize={14} fontWeight={"600"}>{authUser.username}</Text>
                    </Link>
                    <Text fontSize={12} color={"#a8a8a8"} fontWeight={400}>
                        {authUser.fullName}
                    </Text>
                </Box>






            </Flex>

            <Button size={"xs"} background={"transparent"} _hover={{ background: "transparent", color: "white" }} fontSize={12} fontWeight={"600"} color={"blue.400"} cursor={"pointer"} transition={"0.1s ease-in-out"} onClick={handleLogout} isLoading={isLoggingout} >Log out</Button>

        </Flex >
    )
}

export default SuggestedHeader
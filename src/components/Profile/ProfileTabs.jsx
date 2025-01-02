import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsBookmark, BsGrid3X3, BsPersonVideo, BsSuitHeart } from 'react-icons/bs'

function ProfileTabs() {
    return (
        <Flex w={"full"} justifyContent={"center"} gap={{ base: 4, sm: 10 }} textTransform={"uppercase"} fontWeight={"bold"}>

            <Flex borderTop={"1px solid white"} alignItems={"center"} p={3} gap={1.5} cursor={"pointer"}>
                <Box fontSize={12}>
                    <BsGrid3X3 />
                </Box>
                <Text fontSize={12} fontWeight={600} display={{ base: "none", sm: "block" }}> Posts</Text>
            </Flex>

            <Flex alignItems={"center"} p={3} gap={1.5} cursor={"pointer"}>
                <Box fontSize={12}>
                    <BsBookmark />
                </Box>
                <Text fontSize={12} fontWeight={600} display={{ base: "none", sm: "block" }}> Saved</Text>
            </Flex>

            <Flex alignItems={"center"} p={3} gap={1.5} cursor={"pointer"}>
                <Box fontSize={12}>
                    <BsPersonVideo />

                </Box>
                <Text fontSize={12} fontWeight={600} display={{ base: "none", sm: "block" }}>Tagged </Text>
            </Flex>


        </Flex>
    )
}

export default ProfileTabs
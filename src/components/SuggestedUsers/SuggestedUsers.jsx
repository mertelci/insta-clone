import { Box, Flex, Text, VStack, Link } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'


function SuggestedUsers() {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers()


    if (isLoading) return null;


    return (
        <VStack py={8} px={2} gap={4}  >
            <SuggestedHeader />
            {suggestedUsers.length !== 0 && (
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                    <Text fontSize={14} fontWeight={'600'} color={"#a8a8a8"}> Suggested for you</Text>
                    <Text fontSize={12} fontWeight={'600'} color={"#f5f5f5"} cursor={"pointer"} _hover={{ color: "#565656" }}> See all</Text>
                </Flex>)}

            {suggestedUsers?.map((user) => (
                <SuggestedUser user={user} key={user.id} />
            ))}


            <Box fontSize={12} color={"gray.500"} mt={5} >© 2024 Built By {""} <Link href="https://www.linkedin.com/in/mertelci/" target='_blank' color='blue.400' fontSize={12}>Mert Elçi</Link> </Box>
        </VStack>
    )
}

export default SuggestedUsers
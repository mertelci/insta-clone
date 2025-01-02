import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts';

function FeedPosts() {

    const { isLoading, posts } = useGetFeedPosts();





    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {isLoading && [0, 1, 2].map((_, idx) => (
                <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                    <Flex gap={2} >
                        <SkeletonCircle size={10} />
                        <VStack gap={2} alignItems={"flex-start"}>
                            <Skeleton mt={5} height={"10px"} w={"200px"} />


                        </VStack>
                    </Flex>
                    <Skeleton w={"full"}>
                        <Box h={"400px"}>contents</Box>
                    </Skeleton>
                </VStack>
            ))}


            {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
            {!isLoading && posts.length === 0 && (<Box textAlign={"center"} fontSize={"md"} fontWeight={"bold"}>No posts to show</Box>)}



        </Container>
    )
}

export default FeedPosts
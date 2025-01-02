import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useFollowUser from '../../hooks/useFollowUser'
import { timeAgo } from '../../utils/timeAgo'


function PostHeader({ post, creatorProfile }) {

    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy)

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>

            <Flex alignItems={"center"} gap={2}>
                <Link to={`/${creatorProfile?.username}`} >
                    <Avatar src={creatorProfile?.profilePicURL} alt="userprofilepic" size={"md"} />
                </Link>

                <Flex fontSize={13} fontWeight={"bold"} gap={2}>
                    <Link to={`/${creatorProfile?.username}`} >   {creatorProfile?.username}    </Link>
                    <Box fontWeight={"normal"} color={"gray.400"}>• {timeAgo(post.createdAt)}
                    </Box>
                </Flex>

            </Flex>
            <Button cursor={"pointer"} size={"sm"} bg={"transparent"} fontSize={12} fontWeight={"bold"} color={"blue.400"} transition={"0.2s ease-in-out"} _hover={{ bg: "black", color: "white" }} onClick={handleFollowUser} isLoading={isUpdating} >
                {isFollowing ? "Unfollow" : "Follow"}

            </Button>

        </Flex>
    )
}

export default PostHeader
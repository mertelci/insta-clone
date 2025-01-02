import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/timeAgo'
import useUserProfileStore from '../../store/userProfileStore'

const Caption = ({ post, creatorProfile }) => {


    return (
        <Flex gap={4}>
            <Link to={`/${creatorProfile?.username}`} >
                <Avatar src={creatorProfile?.profilePicURL} size={"sm"} />
            </Link>

            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"} justifyContent={"start"}>
                    <Link to={`/${creatorProfile?.username}`} >
                        <Text fontWeight={"600"} fontSize={14} _hover={{ color: "#666666" }} >
                            {creatorProfile?.username}
                        </Text>
                    </Link>
                    <Text fontSize={14} >{post.caption}</Text>
                </Flex>
                <Text color={"gray"} fontSize={12} mt={1}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Caption
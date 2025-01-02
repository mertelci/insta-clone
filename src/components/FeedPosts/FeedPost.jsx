import React from 'react'
import PostHeader from './PostHeader'
import { Box, Image } from '@chakra-ui/react'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

function FeedPost({ post }) {
    const { userProfile } = useGetUserProfileById(post.createdBy);


    return <>

        <PostHeader post={post} creatorProfile={userProfile} />
        <Box borderRadius={8} overflow={"hidden"}>
            <Image src={post.imageURL} alt={"FEEDPOST IMG"} />
        </Box>
        <PostFooter post={post} creatorProfile={userProfile} />
    </>

}

export default FeedPost
import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import useUserProfileStore from "../../store/userProfileStore";
import CreatePost from "../Sidebar/CreatePost";

const ProfilePosts = () => {
    const { isLoading, posts } = useGetUserPosts();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    const noPostsFound = !isLoading && posts.length === 0;
    if (noPostsFound) return <NoPostsFound />;

    return (
        <Grid
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
            }}
            gap={1}
            columnGap={1}
        >
            {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} alignItems={"flex-start"} gap={4}>
                        <Skeleton w={"full"}>
                            <Box h='300px'>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

            {!isLoading && (
                <>
                    {posts.map((post) => (
                        <ProfilePost post={post} key={post.id} creatorProfile={userProfile} />
                    ))}
                </>
            )}
        </Grid>
    );
};

export default ProfilePosts;

const NoPostsFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>

            <Text fontSize={30} fontWeight={800}>No Posts Yet</Text>

        </Flex>

    );
};
import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/AuthStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
    const authUser = useAuthStore((state) => state.user);

    const onFollowUser = async () => {
        await handleFollowUser();

        // Update the state after follow/unfollow
        setUser({
            ...user,
            followers: isFollowing
                ? (user?.followers || []).filter((follower) => follower.uid !== authUser.uid)
                : [...(user?.followers || []), authUser],
        });
    };


    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`/${user.username}`}>
                    <Avatar src={user.profilePicURL} size={"md"} />
                </Link>
                <VStack spacing={1} alignItems={"flex-start"}>
                    <Link to={`/${user.username}`}>
                        <Box fontSize={14} fontWeight={600}>
                            {user.username}
                        </Box>
                    </Link>
                    <Box fontSize={12} color={"#a8a8a8"} fontWeight={400}>
                        {user.fullName}
                    </Box>
                </VStack>
            </Flex>
            {authUser.uid !== user.uid && (
                <Button
                    fontSize={12}
                    bg={"transparent"}
                    p={0}
                    h={"max-content"}
                    fontWeight={"medium"}
                    color={"blue.400"}
                    cursor={"pointer"}
                    _hover={{ color: "white" }}
                    onClick={onFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>
    );
};

export default SuggestedUser;
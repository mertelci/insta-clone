import { Avatar, Box, Button, Divider, Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants';
import usePostComment from '../../hooks/usePostComment';
import useAuthStore from '../../store/AuthStore';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import Caption from '../Comment/Caption';
import useUserProfileStore from '../../store/userProfileStore';
import Comment from '../Comment/Comment';
import { Link } from 'react-router-dom';

function PostFooter({ post, username, isProfilePage, creatorProfile }) {

    const [comment, setComment] = useState("");
    const { isCommenting, handlePostComment } = usePostComment();
    const authUser = useAuthStore(state => state.user)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const commentRef = useRef(null);
    const { handleLikePost, isLiked, likes } = useLikePost(post);
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment("");
    }


    return (


        <Box mb={10} marginTop={"auto"}   >
            <Flex alignItems={"center"} gap={1.5} w={"full"} pt={2} mb={2} mt={"auto"}   >
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={12}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>


                <Box cursor={"pointer"} fontSize={12} mx={1} onClick={() => commentRef.current.focus()}>
                    <CommentLogo />
                </Box>

            </Flex>
            <Text fontWeight={600} fontSize={"sm"} mt={1.5}>{likes} likes

            </Text>

            {isProfilePage && (
                <Text fontSize={"12"} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            )}

            {!isProfilePage && (
                <>
                    <Box mt={2}>
                        <Text fontSize={"sm"} fontWeight={700}>
                            {creatorProfile?.username}{" "}
                            <Text as="span" fontWeight={400}>
                                {post.caption}
                            </Text>
                        </Text>

                        {post.comments.length > 0 && (

                            <Text mt={1} fontSize={'sm'} color={"gray"} cursor={"pointer"} onClick={onOpen}>
                                View all {post.comments.length} comments
                            </Text>
                        )}
                    </Box>
                    {isOpen && (

                        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton />

                                <ModalBody bg={"black"} pb={5}>
                                    {/* Modal Flex */}
                                    <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
                                        {/* Image */}
                                        <Flex borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.200"} flex={2} justifyContent={"center"} alignItems={"center"} >
                                            <Image src={post?.imageURL} alt='profilepost' />
                                        </Flex>

                                        {/* username header */}
                                        <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>

                                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                                <Flex alignItems={"center"} gap={4}  >
                                                    <Link to={`/${creatorProfile?.username}`} >
                                                        <Avatar src={creatorProfile?.profilePicURL} size={"sm"} />
                                                    </Link>
                                                    <Link to={`/${creatorProfile?.username}`} >
                                                        <Text fontSize={14} fontWeight={600} _hover={{ color: "#666666" }}>{creatorProfile?.username}</Text>
                                                    </Link>
                                                </Flex>

                                            </Flex>

                                            <Divider my={4} bg={"gray.800"} />

                                            <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                                {/* Caption */}
                                                {post.caption && <Caption post={post} creatorProfile={creatorProfile} />}

                                                {/* Comments */}
                                                {post.comments.map((comment) => (
                                                    <Comment key={comment.createdAt} comment={comment} />
                                                ))}

                                            </VStack>
                                            <Divider my={4} bg={"gray.800"} />

                                            <PostFooter isProfilePage={true} post={post} />





                                        </Flex>
                                    </Flex>
                                </ModalBody>
                            </ModalContent>
                        </Modal >
                    )}
                </>
            )}

            {authUser && (
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}    >
                    <InputGroup>
                        <Input variant={"flushed"} placeholder='Add a comment...' fontSize={13} onChange={(e) => setComment(e.target.value)} value={comment} ref={commentRef} />
                        <InputRightElement>
                            <Button fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{ color: "white" }} bg={"transparent"}
                                onClick={handleSubmitComment} isLoading={isCommenting}
                            >Post</Button>
                        </InputRightElement>
                    </InputGroup>

                </Flex>
            )}

        </Box>


    )
}

export default PostFooter
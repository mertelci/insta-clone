import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/AuthStore';
import { firestore, storage } from "../../firebase/firebase";
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import usePostStore from '../../store/postStore';
import useShowToast from '../../hooks/useShowToast';
import Caption from '../Comment/Caption';



const ProfilePost = ({ post, creatorProfile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const userProfile = useUserProfileStore((state) => state.userProfile)
  const authUser = useAuthStore((state) => state.user)
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false)
  const deletePost = usePostStore((state) => state.deletePost)
  const decrementPostNumber = useUserProfileStore((state) => state.deletePost)


  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`)
      await deleteObject(imageRef)
      const userRef = doc(firestore, "users", authUser.uid)
      await deleteDoc(doc(firestore, "posts", post.id))
      await updateDoc(userRef, { posts: arrayRemove(post.id) })
      deletePost(post.id);
      decrementPostNumber(post.id);
      showToast("Success", "Post deleted successfully", "success");

    }

    catch (error) {
      showToast("Error", error.message, "error")
    }
    finally {
      setIsDeleting(false)

    }
  }

  return (
    <>

      <GridItem cursor={"pointer"} overflow={"hidden"} position={"relative"} aspectRatio={1 / 1} onClick={onOpen}>

        {/* grid box properties */}
        <Flex opacity={0} _hover={{ opacity: 1 }} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.500"} transition={"all 0.3 ease"} zIndex={1} justifyContent={"center"} >

          {/* Like and comment hover */}
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex alignItems={"center"} gap={1}> <AiFillHeart size={20} /> <Text fontWeight={"bold"}>{post.likes.length}</Text></Flex>
            <Flex alignItems={"center"} gap={1}><FaComment /><Text fontWeight={"bold"}>{post.comments.length}</Text></Flex>
          </Flex>

        </Flex>
        <Image src={post.imageURL} alt='profilepost' w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem >

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
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={creatorProfile?.profilePicURL} size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={14} cursor={"pointer"} _hover={{ color: "#464646" }}>{creatorProfile?.username}</Text>
                  </Flex>

                  {authUser?.uid === userProfile.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ color: "red.800" }}
                      borderRadius={4}
                      p={1}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor='pointer' />
                    </Button>
                  )}


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


                <PostFooter isProfilePage={true} post={post} />





              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal >
    </>
  )
}

export default ProfilePost
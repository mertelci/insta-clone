import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/AuthStore';
import EditProfile from '../Profile/EditProfile';
import useFollowUser from '../../hooks/useFollowUser';
import FollowersFollowingModal from '../Modals/FollowersFollowingModal';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.js';


function ProfileHeader() {

  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid)
  const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');



  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure(); // Followers/Following modal için



  const handleOpenModal = async (type) => {
    const uids = type === 'followers' ? userProfile.followers : userProfile.following;
    const data = await fetchUserData(uids); // Firebase'den verileri çek
    setModalData(data);
    setModalTitle(type.charAt(0).toUpperCase() + type.slice(1)); // Başlık
    openModal(); // Modalı aç
  };

  const fetchUserData = async (uids) => {
    const userData = [];
    for (const uid of uids) {
      const userRef = doc(firestore, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userData.push(userSnap.data());
      }
    }
    return userData;
  };

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={0} direction={{ base: "column", sm: "row" }} mx={10}>
      {/* avatar */}
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}


      >
        <Avatar src={userProfile.profilePicURL} alt='mertelcii logo' />
      </AvatarGroup>
      {/* username and edit info */}
      <VStack alignItems={"start"} gap={5} mx={6} flex={1}>
        <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>
          <Text fontSize={{ base: "sm", md: "lg" }} color={"#f5f5f5"} fontWeight={"600"}>{userProfile.username}</Text>
          {visitingOwnProfileAndAuth && (<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button bg="#363636" color={"#f5f5f5"} _hover={{ bg: "#262626" }} size={{ base: "xs", md: "sm" }} onClick={onOpen}>
              Edit Profile</Button>
          </Flex>)}
          {visitingAnotherProfileAndAuth && (<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button bg={"#464646"} color={"white"} _hover={{ bg: "#262626" }} size={{ base: "xs", md: "sm" }} onClick={handleFollowUser} isLoading={isUpdating}> {isFollowing ? "Unfollow" : "Follow"} </Button>
          </Flex>)}

        </Flex>
        {/* Followers info */}

        {/* posts */}
        <Flex alignItems={"center"} gap={{ base: 3, sm: 8 }} mb={1}>
          <Text fontSize={{ base: "xs", md: "md" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
            Posts
          </Text>

          {/* Followers ve Following */}
          <Flex alignItems={'center'} gap={{ base: 3, sm: 8 }} mb={1}>
            <Text
              fontSize={{ base: 'xs', md: 'md' }}
              onClick={() => handleOpenModal('followers')}
              cursor="pointer"
            >
              <Text as={'span'} fontWeight={'bold'} mr={1}>
                {userProfile.followers.length}
              </Text>
              Followers
            </Text>
            <Text
              fontSize={{ base: 'xs', md: 'md' }}
              onClick={() => handleOpenModal('following')}
              cursor="pointer"
            >
              <Text as={'span'} fontWeight={'bold'} mr={1}>
                {userProfile.following.length}
              </Text>
              Following
            </Text>
          </Flex>


        </Flex>

        {/* Name */}
        <Flex alignItems={"center"} gap={3}>
          <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.fullName}</Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack >
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}

      {isModalOpen && (
        <FollowersFollowingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
          data={modalData}
          setModalData={setModalData}



        />
      )}
    </Flex >
  )
}

export default ProfileHeader
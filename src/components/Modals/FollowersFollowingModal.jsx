import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    VStack,
    HStack,
    Avatar,
    Text,
    Button,
    Box,
} from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';

function FollowersFollowingModal({ isOpen, onClose, title, data }) {
    const [searchQuery, setSearchQuery] = useState('');
    const authUser = useAuthStore((state) => state.user);

    const filteredData = data.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg="#1a1a1a" color="#f5f5f5" maxW="400px">
                <ModalHeader w={"full"} textAlign={"center"} fontSize={16} color={"#f5f5f5"} fontWeight={"600"}>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Search Input */}
                    <Input
                        placeholder="Search"
                        mb={2}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="#2a2a2a"
                        border="none"
                        _focus={{ outline: 'none', borderColor: '#3a3a3a' }}
                    />

                    {/* User List */}
                    <VStack align="stretch" spacing={4} maxH="300px" overflowY="auto">
                        {filteredData.map((user) => {


                            return (
                                <HStack
                                    key={user.uid}
                                    justify="space-between"
                                    p={2}
                                    borderRadius="md"

                                >
                                    <HStack>
                                        <Link to={`/${user?.username}`} >
                                            <Avatar size="sm" src={user.profilePicURL} />
                                        </Link>
                                        <Box>
                                            <Link to={`/${user?.username}`} >
                                                <Text fontSize={14} color="#f5f5f5" fontWeight={"600"}>
                                                    {user.username}
                                                </Text>
                                            </Link>
                                            <Text fontSize="xs" color="gray.400">
                                                {user.fullName}
                                            </Text>
                                        </Box>
                                    </HStack>

                                </HStack>
                            );
                        })}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default FollowersFollowingModal;
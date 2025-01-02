import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignupEmailPass from '../../hooks/useSignupEmailPass';

function SignUp() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: '',
        password: ''
    });

    const [showPassword, setshowPassword] = useState(false);
    const { loading, error, signup } = useSignupEmailPass()

    return (
        <>

            <Input placeholder='Email' fontSize={12} type='email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} size={"sm"} bg={"#121212"} color={"#f5f5f5"} />
            <Input placeholder='Username' fontSize={12} type='text' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} size={"sm"} bg={"#121212"} color={"#f5f5f5"} />
            <Input placeholder='Full Name' fontSize={12} type='text' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} size={"sm"} bg={"#121212"} color={"#f5f5f5"} />


            <InputGroup>
                <Input placeholder='Password' fontSize={12} type={showPassword ? "text" : 'password'} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} size={"sm"} bg={"#121212"} color={"#f5f5f5"} />
                <InputRightElement height={"full"} >
                    <Button variant={"ghost"} size={"sm"} onClick={() => setshowPassword(!showPassword)} bg={"#121212"} >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <Button w={"full"} bg={"blue.400"} _hover={{ bg: "blue.600" }} size={"sm"} fontSize={14}
                isLoading={loading}
                onClick={() => signup(inputs)}>
                Sign up
            </Button >



        </>
    )
}

export default SignUp
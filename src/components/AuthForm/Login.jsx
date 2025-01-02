import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''


    });
    const { loading, error, login } = useLogin();
    const [showPassword, setshowPassword] = useState(false);
    return (
        <>


            <Input placeholder='Email' fontSize={12} type='email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} size={"md"} bg={"#121212"} color={"#f5f5f5"} />
            <InputGroup>
                <Input placeholder='Password' fontSize={12} type={showPassword ? "text" : 'password'} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} size={"md"} bg={"#121212"} color={"#f5f5f5"} />

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

            <Button w={"full"} bg={"blue.400"} _hover={{ bg: "blue.600" }} size={"sm"} fontSize={14} isLoading={loading} onClick={() => login(inputs)} >
                Log in
            </Button >


        </>
    )
}

export default Login
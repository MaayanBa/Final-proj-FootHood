import React, { useContext, useState } from 'react'

const LoginContext = React.createContext();
const LoginUpdateContext = React.createContext();


export function useLogin() {
    return useContext(LoginContext)
}
export function useLoginUpdate() {
    return useContext(LoginUpdateContext)
}


export function TokenProvider({ children }) {

    const [loginData, setLoginData] = useState({
        email: 'bdkasjbdkajsb',
        passCode: 'dfsdfs',
        otp: 'fsdfsdf',
    });

    function UpdateLoginData(email, passCode, otp) {
        setLoginData({
            email,
            passCode,
            otp,
        })
    }

    return (
        <LoginContext.Provider value={loginData}>
            <LoginUpdateContext.Provider value={UpdateLoginData}>
                {children}
            </LoginUpdateContext.Provider>
        </LoginContext.Provider>
    )

}
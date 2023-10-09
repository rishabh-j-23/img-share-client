'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [credError, setCredError] = useState(false);
    
    const router = useRouter();

    const handleLogin = async () => {
        if (username === "" || password === '') {
            setCredError(true);
            return;
        }
        await axios.post(`https://img-share.up.railway.app/auth/login`, {
            username: username,
            password: password,
            email: email
        }).then((res) => {
            if (res.status == 200) {
                setSessionToken(res.data['sessionToken']);
                localStorage.setItem('sessionToken', res.data['sessionToken']);
                router.push('/home');
                
            } else {
                //TODO: push to error page
            }
        }).catch((err) => {
            console.log("login error : ",err);
        });
    }

    return (
        <div className="flex flex-col text-black px-10 py-5">
            <div className="text-center py-4 text-[30px] font-bold">
                <h2>Login</h2>
            </div>
            {credError && <span className="text-center text-red-700 text-sm font-bold">Invalid Credentials</span>}
            <div >
                <label htmlFor="username">Username</label>
                <input type="text" id='username' className="border-black border-solid border-2 m-3 rounded-md p-1 px-3" onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="border-black border-solid border-2 m-3 mx-12 rounded-md p-1 px-3" onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="border-black border-solid border-2 m-3 mx-4 rounded-md p-1 px-3" onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <div className="justify-center items-center flex">
                <button className="border-solid border-2 m-3 mx-4 rounded-md p-1 px-3" onClick={handleLogin}>Login</button>
            </div>
            <div className="text-sm text-center italic ">
                Dont have an account?
                <span className="not-italic font-semibold cursor-pointer" onClick={() => router.push('/register')}> Register</span>
            </div>
        </div>
    );
}

export default LoginForm;

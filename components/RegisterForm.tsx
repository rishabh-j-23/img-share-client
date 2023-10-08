// 'use client'

import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const RegisterForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [credError, setCredError] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {
        if (username === "" || password === '' || email === '') {
            setCredError(true);
            return;
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            username: username,
            email: email,
            password: password
        }).then(res => {
            router.push('/login');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="flex flex-col text-black px-10 py-5">
            <div className="text-center py-4 text-[30px] font-bold">
                <h2>Register</h2>
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
                <button className="border-solid border-2 m-3 mx-4 rounded-md p-1 px-3" onClick={handleRegister}>Register</button>
            </div>
            <div className="text-sm text-center italic ">
                Already have an account?
                <span className="not-italic font-semibold cursor-pointer" onClick={() => router.push('/login')}> Login</span>
            </div>
        </div>
    );
}

export default RegisterForm;
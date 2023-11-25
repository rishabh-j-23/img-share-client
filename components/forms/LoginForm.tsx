'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ImageLogo from "../ui/ImageLogo";

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [credError, setCredError] = useState(false);
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handleLogin = async () => {
        if (username === "" || password === '') {
            setCredError(true);
            return;
        }
        if (credError) {
            setCredError(false)
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            username: username,
            password: password,
            email: email
        }, { headers: { sessionToken: localStorage.getItem('sessionToken') } }).then((res) => {
            if (res.status == 200) {
                setSessionToken(res.data['sessionToken']);
                localStorage.setItem('sessionToken', res.data.sessionToken)
                router.push('/home');
            } else {
                setCredError(true);
            }
        }).catch((err) => {
            setCredError(true);
            console.log("login error : ", err);
        });
        setLoading(false);
    }

    return (
        <div className="flex flex-col text-black px-10 m-[3%] items-center justify-center lg:pl-0">
            <div className="text-center text-[30px] font-bold">
                <h2>Login</h2>
            </div>
            {credError && <span className="text-center text-red-700 text-sm font-bold">Invalid Credentials</span>}
            <div className="flex justify-between">
                <ImageLogo />
                <div className="lg:pl-4">
                    <div >
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' className="border-black border-solid border-2 m-3 rounded-md p-1 px-3"
                            onChange={(event) => {
                                setCredError(false);
                                setUsername(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mr-9">Email</label>
                        <input type="email" name="email" id="email" className="border-black border-solid border-2 m-3 rounded-md p-1 px-3"
                            onChange={(event) => {
                                setCredError(false);
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="border-black border-solid border-2 m-3 mx-4 rounded-md p-1 px-3"
                            onChange={(event) => {
                                setCredError(false);
                                setPassword(event.target.value)
                            }}
                        />
                    </div>
                    <div className="justify-center items-center flex">
                        <button className="border-solid border-2 m-3 mx-4 rounded-md p-1 px-3 hover:bg-blue-500"
                            onClick={() => {
                                setLoading(true);
                                handleLogin();
                            }}
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        {loading && (!credError && <span className="text-green-400">Logging you in</span>)}
                    </div>
                    <div className="text-sm text-center italic ">
                        Dont have an account?
                        <span className="not-italic font-semibold cursor-pointer" onClick={() => router.push('/register')}> Register</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

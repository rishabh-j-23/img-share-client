'use client';

import LoginForm from "@/components/LoginForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    return (

        <div className='h-screen flex items-center justify-center '>
            <div className='border-solid border-white  bg-slate-50 border-l rounded-md m-[3%] lg:w-2/5'>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
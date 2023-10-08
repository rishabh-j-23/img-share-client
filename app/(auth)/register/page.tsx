'use client'

import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {

    return (
        <div className='h-screen flex items-center justify-center '>
            <div className='border-solid border-white  bg-slate-50 border-l rounded-md'>
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
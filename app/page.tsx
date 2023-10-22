'use client';

import { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import { redirect, useRouter } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';

const Authpage = () => {
    const router = useRouter();

    useEffect(() => {
        var token = localStorage.getItem('sessionToken');
        if(token){
            redirect('/home');
        }
    }, []);

    return (
        <div className='h-screen flex items-center justify-center mx-[3%]'>
            <div className='border-solid border-white  bg-slate-50 border-l rounded-md text-black text-center p-10 '>
                <div className='text-3xl text-center font-bold'>
                    <span>Img Share</span>
                </div>
                <div className=' p-5'>
                    <div className='p-6 flex flex-col'>
                        <span>Already have an account?</span>
                        <button 
                            onClick={() => router.push('login')}
                            className='
                                border-solid border-2 m-3 mx-4 rounded-md p-1 px-3 
                                hover:bg-blue-400 hover:font-bold
                            '
                        >
                            Login
                        </button>
                    </div>
                    <div className='p-6 flex flex-col'>
                        <span>Don&lsquo;t have an account?</span>
                        <button 
                            onClick={() => router.push('/register')}
                            className='
                                border-solid border-2 m-3 mx-4 rounded-md p-1 px-3 
                                hover:bg-blue-400 hover:font-bold
                            '
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authpage;
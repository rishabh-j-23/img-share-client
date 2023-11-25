'use client';

import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import ImageLogo from '@/components/ui/ImageLogo';
import Link from 'next/link';

const Authpage = () => {
    const router = useRouter();

    useEffect(() => {
        var token = localStorage.getItem('sessionToken');
        if (token) {
            redirect('/home');
        }
    }, []);

    return (
        <div className='h-screen flex items-center justify-center mx-[3%]'>
            <div className='border-solid border-white  bg-slate-50 border-l rounded-md text-black text-center p-10 '>
                <div className='text-3xl text-center font-bold p-2'>
                    <span>Img Share</span>
                </div>
                <div className='flex justify-between items-center'>
                    <ImageLogo />
                    <div className='focus:bg-blue-500'>
                        <div className='p-5'>
                            <div className='p-6 flex flex-col'>
                                <span>Already have an account?</span>
                                <Link href={'/login'}>
                                    <button
                                        className='
                                        border-solid border-2 m-3 mx-4 rounded-md p-1 px-3 
                                        hover:bg-blue-400 hover:font-bold
                                        w-full
                                    '
                                    >
                                        Login
                                    </button>
                                </Link>
                            </div>
                            <div className='p-6 flex flex-col'>
                                <span>Don&lsquo;t have an account?</span>
                                <Link href={'/register'}>
                                    <button
                                        className='
                                        border-solid border-2 m-3 mx-4 rounded-md p-1 px-3 
                                        hover:bg-blue-400 hover:font-bold
                                        w-full
                                    '
                                    >
                                        Register
                                    </button>
                                </Link>
                            </div>
                            <div className='p-6 flex flex-col'>
                                <span>Don&lsquo;t want to create an account?</span>
                                <Link href={'/home'}>
                                    <button
                                        className='
                                        border-solid border-2 m-3 mx-4 rounded-md p-1 px-3 
                                        hover:bg-blue-400 hover:font-bold
                                        w-full
                                    '
                                    >
                                        Go to Homepage
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authpage;
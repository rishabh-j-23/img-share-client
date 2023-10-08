'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';

const Authpage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className='h-screen flex items-center justify-center '>
            <div className='border-solid border-white  bg-slate-50 border-l rounded-md'>
                <LoginForm />
            </div>
        </div>
    );
}

export default Authpage;
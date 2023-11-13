'use client';

import MobileHeader from "@/components/header/MobileHeader";
import MobileNavBar from "@/components/navbar/MobileNavBar";
import SideBar from "@/components/navbar/Sidebar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const HomeLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [sessionToken, setSessionToken] = useState<string | undefined>('');

    useEffect(() => {
        var token = !localStorage.getItem('sessionToken') ? '' : localStorage.getItem('sessionToken');
        if (!token) {
            redirect('/');
        }
        setSessionToken(token?.toString())
    }, [sessionToken])

    return (
        <div className="bg-neutral-800">
            <div className='lg:w-[180px] lg:h-full lg:block hidden '>
                <SideBar sessionToken={sessionToken} />
            </div>
            <div className="lg:hidden sm:block" >
                <MobileHeader />
            </div>
            <div className="p-0 m-0 mt-14 lg:mt-0 lg:ml-[180px]">
                {children}
            </div>
            <div className='sm:block lg:hidden '>
                <MobileNavBar />
            </div>
        </div>

    );
}

export default HomeLayout;
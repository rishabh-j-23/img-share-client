'use client';

import { useRouter } from "next/navigation";
import { BiSolidLogOut } from 'react-icons/bi'

const Logout = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('sessionToken');
        router.push('/login');
    }
    return (
        <button className="border-solid border-white border-2 p-1 rounded-full m-1 hover:bg-blue-500"
            onClick={handleLogout}
        >
            <div className="flex flex-row items-center justify-center">
                <BiSolidLogOut />
            </div>
        </button>
    );
}

export default Logout;
import { useEffect, useState } from "react";

import Avatar from "../user/Avatar";
import Logo from "../ui/Logo";
import Button from "../ui/button/Button";

import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { TiUpload } from 'react-icons/ti';


type SideBarProps = {
    sessionToken?: string | undefined
}

const SideBar: React.FC<SideBarProps> = ({
    sessionToken
}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();

    useEffect(() => {
        var token = localStorage.getItem('sessionToken');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?token=${token}`, { headers: { sessionToken: localStorage.getItem('sessionToken') } })
            .then(res => {
                setUsername(res.data['username']);
                setEmail(res.data['email']);
            }).catch(err => console.log(err))
    }, [])

    return (
        <div className="
            flex flex-col
            border-gray-50
            border-solid
            bg-zinc-900
            h-full
            p-4
            items-center
            justify-between
            fixed
            ml-1
        ">
            <div>
                <div>
                    <Logo />
                </div>
                <ul className="p-2 inline-block py-9
                    items-center justify-center
                    text-[1.2em]
                ">
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/home')}
                    >
                        <Button buttonType="Home" buttonIcon={<AiOutlineHome />} />
                    </li>
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/profile')}
                    >
                        <Button buttonType="Profile" buttonIcon={<AiOutlineUser />} />
                    </li>
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/upload')}
                    >
                        <Button buttonType="Upload" buttonIcon={<TiUpload />} />
                    </li>
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/search')}
                    >
                        <Button buttonType="Search" buttonIcon={<AiOutlineSearch />} />
                    </li>
                </ul>
            </div>
            <div>
                <Avatar username={username} email={email} logoutBtn={true} />
            </div>

        </div>
    );
}

export default SideBar;

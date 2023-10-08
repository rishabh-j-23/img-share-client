import { useCallback, useEffect, useState } from "react";
import Avatar from "./Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        axios.get(`http://localhost:8080/user?token=${token}`).then(res => {
            setUsername(res.data['username']);
            setEmail(res.data['email']);
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="
            flex flex-col
            border-gray-50
            border-solid
            bg-gray-900
            h-full
            p-4
            items-center
            justify-between
            fixed
        ">
            <div>
                <h1 className="font-bold text-lg font-serif">
                    Img Share
                </h1>
                <ul className="p-2 inline-block py-9
                    items-center justify-center
                ">
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/profile')}
                    >
                        Profile
                    </li>
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/uploadImage')}
                    >
                        Upload
                    </li>
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/search')}
                    >
                        Search
                    </li>
                    <li className="sibebar-li-style hover:bg-blue-500 rounded-full items-center text-center"
                        onClick={() => router.push('/explore')}
                    >
                        Explore
                    </li>
                </ul>
            </div>
            <div>
                <Avatar username={username} email={email} logoutBtn={true}/>
            </div>

        </div>
    );
}

export default SideBar;

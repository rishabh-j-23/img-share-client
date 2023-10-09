"use client";

import Avatar from "@/components/Avatar";
import ImgBox from "@/components/ImgBox";
import axios from "axios";
import { useEffect, useState } from "react";

type Image = {
    _id: string,
    imageData: string,
    uploadedBy: string,
    postName: string,
    username: string
}

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userSharedImages, setUserSharedImages] = useState([]);

    useEffect(() => {
        var token = localStorage.getItem('sessionToken');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?token=${token}`).then(res => {
            setUsername(res.data['username']);
            setEmail(res.data['email']);
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // Fetch user's shared images only when `username` is available
        if (username) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/user?username=${username}`).then((res) => {
                setUserSharedImages(res.data);
                console.log(res.data, username)
            }).catch(err => console.log(err));
        }
    }, [username]); // Add `username` as a dependency

    return (
        <div className="h-screen m-3">
            <div className="border-t-2 border-b-2 rounded-md p-4">
                <Avatar username={username} email={email} logoutBtn={false} />
            </div>
            <div className="border-r-2 border-l-2 border-b-2 mt-4 rounded-lg">
                <h2 className="p-4 bold text-lg">Images Shared</h2>
                <div className="flex flex-wrap">
                    {
                        userSharedImages.length === 0 ? <div className="text-center w-full p-10">No Images Shared</div> :
                        userSharedImages.map((image: Image) => {
                            return <ImgBox key={image._id} image={image.imageData} uploadedBy={image.username} postName={image.postName} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

"use client";

import Avatar from "@/components/user/Avatar";
import Post from "@/components/post/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import Tag from "@/components/post/Tag";

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
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?token=${token}`, { headers: { sessionToken: localStorage.getItem('sessionToken') } }).then(res => {
            setUsername(res.data['username']);
            setEmail(res.data['email']);
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // Fetch user's shared images only when `username` is available
        if (username) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/user?username=${username}`, { headers: { sessionToken: localStorage.getItem('sessionToken') } }).then((res) => {
                setUserSharedImages(res.data);
            }).catch(err => console.log(err));
        }
    }, [username]); // Add `username` as a dependency

    return (
        <div className="h-screen mb-20">
            <div className="p-4">
                <div className="flex flex-col lg:justify-center">
                    <div className="flex items-center  mb-2 lg:mr-2">
                        <Tag name="user"/>
                        <span>{username}</span>
                    </div>
                    <div className="flex items-center">
                        <Tag name="email"/>
                        <span>{email}</span>
                    </div>

                </div>
            </div>
            <div className="">
                <h2 className="p-4 bold text-lg">Posts Shared</h2>
                <div className="flex flex-col p-4 items-center">
                    {
                        userSharedImages.length === 0 ? <div className="text-center w-full p-10">No Images Shared</div> :
                            userSharedImages.map((image: Image) => {
                                return <Post key={image._id} id={image._id} image={image.imageData} uploadedBy={image.username} postName={image.postName} />
                            })
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

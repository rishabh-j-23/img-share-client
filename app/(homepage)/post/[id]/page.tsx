'use client';

import Post from "@/components/post/Post";
import Tag from "@/components/post/Tag";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const PostPage = ({ params }: { params: { id: string } }) => {

    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [postName, setPostName] = useState('');
    const [description, setPostDescription] = useState('');

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/id?id=${params.id}`, { headers: { sessionToken: localStorage.getItem('sessionToken') } })
            .then((res) => {
                setImage(res.data.imageData);
                setUsername(res.data.username);
                setPostName(res.data.postName);
                setPostDescription(res.data.description);
            });
    }, [params.id]);

    return (
        <div className="h-full" >
            <div className="p-5 ">
                <div className="shadow-xl w-auto">
                    <div>
                        <div className="text-sm flex items-center">
                            <Tag name="user" />
                            <span className="text-sm p-1">{username}</span>
                        </div>
                        <div className="flex items-center">
                            <Tag name="title" />
                            <div className=" p-2">
                                <span className="text-2xl mt-2 mb-3">{postName}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="p-2 lg:w-[1000px]">
                                <span className="text-md mt-2 mb-3 ">{description}</span>
                            </div>
                        </div>
                    </div>
                    <Image
                        src={image}
                        width={900}
                        height={900}
                        alt="Post image"
                        className="p-2"
                    />

                </div>
            </div>
        </div>
    );
}

export default PostPage;
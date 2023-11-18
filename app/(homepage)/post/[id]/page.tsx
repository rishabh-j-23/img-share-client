'use client';

import Tag from "@/components/post/Tag";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const PostPage = ({ params }: { params: { id: string } }) => {

    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [postName, setPostName] = useState('');
    const [description, setPostDescription] = useState('');
    const [fadeIn, setFadeIn] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/id?id=${params.id}`, { headers: { sessionToken: localStorage.getItem('sessionToken') } })
            .then((res) => {
                setLoading(false);
                const { imageData, username, postName, description } = res.data;
                setImage(imageData);
                setUsername(username);
                setPostName(postName);
                setPostDescription(description);
                setFadeIn(true);
            });
    }, [params.id]);

    return (
        <div className="h-screen" >
            {loading &&
                <div className="flex items-center justify-center p-[20%]">
                    <BounceLoader color={'#fff'} loading={loading} size={35}/>
                </div>
            }
            <div className={` rounded-lg p-5 shadow-xl w-auto transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
                <div className="w-auto">
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
                        {description && (
                            <div className="flex items-center">
                                <div className="p-2 lg:w-[1000px]">
                                    <span className="text-md mt-2 mb-3 ">{description}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {image && (
                        <Image src={image} width={900} height={900} alt="Post image" loading="lazy"
                            className="p-2"
                        />
                    )}

                </div>
            </div>
        </div>
    );
}

export default PostPage;
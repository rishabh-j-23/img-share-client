import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import axios from 'axios';
import Tag from "./Tag";
import Image from "next/image";

type PostProps = {
    id: string;
    uploadedBy: string;
    postName: string;
    description?: string;
};

const Post: React.FC<PostProps> = ({
    id,
    uploadedBy,
    postName,
    description,
}) => {
    const router = useRouter();

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [img, setImg] = useState('');

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/id?id=${id}`, {
            headers: { sessionToken: localStorage.getItem('sessionToken') }
        })
        .then(res => {
            const { imageData } = res.data;
            setImg(imageData);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            // Handle error, set default image, show placeholder, etc.
        });
    }, [id]);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handlePostClick = () => {
        router.push(`/post/${id}`);
    };

    return (
        <div className="bg-neutral-900 rounded-md flex items-center p-3 m-0 my-2 overflow-clip lg:m-2 lg:w-[700px] lg:p-6 justify-between cursor-pointer">
            <div className="w-full h-[auto] lg:flex lg:flex-row lg:justify-between">
                <div className="flex flex-col mb-2">
                    {/* user and 3 dot menu */}
                    <div className='flex justify-between items-center'>
                        <div>
                            {/* posted by user */}
                            <div className="text-xs flex items-center">
                                <span>
                                    <Tag name="user" />
                                </span>
                                <span className="text-sm p-1">{uploadedBy}</span>
                            </div>
                        </div>
                        <div className='text-lg lg:hidden block'>
                            <BiDotsVerticalRounded />
                        </div>
                    </div>
                    {/* Post name */}
                    <div onClick={handlePostClick} className="hover:underline">
                        <span className="text-2xl mt-2 mb-3">
                            {postName}
                        </span>
                    </div>
                    {/* Post description */}
                    <div className="w-72 lg:h-32 lg:block hidden py-1 overflow-hidden text-ellipsis">
                        <span className={`overflow-hidden ${showFullDescription ? "" : "line-clamp-3"}`}>
                            {description}
                        </span>
                        {description && description.length > 100 && (
                            <button
                                className="text-blue-500 cursor-pointer"
                                onClick={toggleDescription}
                            >
                                {showFullDescription ? "Show less" : "Show more"}
                            </button>
                        )}
                    </div>
                </div>
                {img && (
                    <div onClick={handlePostClick} className="hover:shadow-md shadow-white" >
                        {/* Post image lg */}
                        <div className="lg:block hidden ml-28">
                            <Image
                                src={img}
                                alt={postName}
                                className="rounded-md"
                                width={innerWidth}
                                height={innerHeight}
                                loading="lazy"
                                
                            />
                        </div>
                        {/* Post image sm */}
                        <div className="lg:hidden block">
                            <Image
                                src={img}
                                alt={postName}
                                className="rounded-md w-full h-full"
                                width={innerWidth}
                                height={innerHeight}
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;

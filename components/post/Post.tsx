import pic from '@/public/placeholder/placeholder-image.jpg'

import Image from "next/image";
import Tag from "./Tag";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiDotsVerticalRounded } from 'react-icons/bi';

type PostProps = {
    id: string;
    image: string;
    uploadedBy: string;
    postName: string;
    description?: string;
};

const Post: React.FC<PostProps> = ({
    id,
    image,
    uploadedBy,
    postName,
    description,
}) => {
    const router = useRouter();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div
            className=" bg-neutral-900 rounded-md flex items-center p-3 m-0 my-2 overflow-clip
                lg:m-2 lg:w-[700px] lg:p-6
                justify-between
                cursor-pointer
            "
        >
            <div className="w-full h-[auto] lg:flex lg:flex-row lg:justify-between"
                onClick={() => {
                    router.push(`/post/${id}`);
                }}
            >
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
                    {/* post name */}
                    <div className="">
                        <span className="text-2xl mt-2 mb-3">{postName}</span>
                    </div>
                    {/*post  description */}
                    <div className="w-72 lg:h-32 lg:block hidden py-1 overflow-hidden text-ellipsis" >
                        <span className={`overflow-hidden ${showFullDescription ? "" : "line-clamp-3"}`}>
                            {description}
                        </span>
                        {description && description.length > 100 && (
                            <button
                                className="text-blue-500 cursor-pointer"
                                onClick={() => { toggleDescription() }}
                            >
                                {showFullDescription ? "Show less" : "Show more"}
                            </button>
                        )}
                    </div>
                </div>
                {/* post image lg */}
                <div className="lg:block hidden ml-28">
                    <Image
                        src={image ? image : ""}
                        alt={postName}
                        className="rounded-md"
                        width={360}
                        height={100}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>
                {/* post image sm */}
                <div className="lg:hidden block">
                    <Image
                        src={image ? image : pic}
                        alt={postName}
                        className="rounded-md w-72 h-72 "
                        width={1000}
                        height={100}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>
            </div>
        </div>
    );
};

export default Post;
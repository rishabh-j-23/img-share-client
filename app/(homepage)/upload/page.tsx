"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import pic from '@/public/placeholder/placeholder-image.jpg'
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

const UploadImage = () => {
    const [image, setImage] = useState<string | undefined>('');
    const [imageTitle, setImageTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [userObjectId, setuserObjectId] = useState('');
    const [username, setUsername] = useState('');
    const [uploaded, setUploaded] = useState<boolean | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const router = useRouter()

    const convertToBase64 = (e: any) => {
        var reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result?.toString());
        };
        reader.onerror = (err) => {
            console.log("Filereader err : ", err);
        }
    }

    useEffect(() => {
        var token = localStorage.getItem('sessionToken');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?token=${token}`, { headers: { sessionToken: localStorage.getItem('sessionToken') } }).then(res => {
            setuserObjectId(res.data['_id']);
            setUsername(res.data['username']);
        }).catch(err => console.log(err))
    }, [])

    const handleUpload = async () => {
        setIsUploading(true)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`,
                {
                    postName: imageTitle,
                    uploadedBy: userObjectId,
                    imageData: image,
                    username: username,
                    description: postDescription,
                },
                { headers: { sessionToken: localStorage.getItem('sessionToken') } }
            ).then((res) => {
                console.log('uploaded')
                setuserObjectId(res.data['_id']);
                setUsername(res.data['username']);
                setUploaded(true);
                router.push('/home');
            });
        } catch (err) {
            console.error('Error uploading post:', err);
            setUploaded(false);
            router.push('/upload');
        }
        setIsUploading(false);
    };


    return (
        <div>
            <div className="flex flex-col items-center justify-center lg:h-screen">
                <div className="bg-neutral-700 flex items-center justify-center flex-col p-10  rounded-lg sm:w-full sm:h-full lg:w-auto lg:h-auto">
                    <div className="w-full">
                        <input className="sibebar-li-style px-8 m-2 mb-6 text-black bg-gray-400  rounded-lg flex items-center text-center"
                            accept="image/*"
                            type="file"
                            onChange={convertToBase64}
                        />
                    </div>
                    <div className="flex flex-col  lg:flex-row">
                        <div>

                            <Image
                                src={image ? image : pic}
                                width={300}
                                height={300}
                                alt="image"
                                className="rounded-lg"
                            />
                            <div className="text-center">
                                <span className="text-sm italic text-center">
                                    Preview of Uploaded Image
                                </span>
                            </div>
                        </div>
                        <div className=""> {/*title and description*/}
                            <div className="p-2">
                                <input type="text" name="" id="" className="text-black rounded-2xl p-1 px-3 w-72"
                                    onChange={(e) => setImageTitle(e.target.value)}
                                    placeholder="Post Title"
                                />
                            </div>
                            <div className="p-2">
                                <textarea name="" id="" className="text-black rounded-2xl p-1 px-3 "
                                    onChange={(e) => setPostDescription(e.target.value)}
                                    placeholder="Post Description"
                                    rows={3}
                                    cols={40}
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-center">
                                    {
                                        (uploaded !== null) && (
                                            uploaded ?
                                                <span className="text-green-500">
                                                    Post Uploaded!
                                                </span> :
                                                <span className="text-red-500">
                                                    Post Upload failed!
                                                </span>
                                        )
                                    }
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="sibebar-li-style mt-8 text-black bg-gray-400 hover:bg-blue-500 rounded-full flex items-center text-center"
                                        onClick={handleUpload}
                                        disabled={uploaded === true || uploaded === false}
                                    >
                                        {isUploading ? <span>Uploading</span> : <span>Upload</span>}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default UploadImage;
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import pic from '@/public/placeholder/placeholder-image.jpg'
import axios from "axios";
import { useRouter } from "next/navigation";
import SideBar from "@/components/Sidebar";

const UploadImage = () => {
    const [image, setImage] = useState<string | undefined>('');
    const [imageTitle, setImageTitle] = useState('');
    const [userObjectId, setuserObjectId] = useState('');
    const [username, setUsername] = useState('');

    const router = useRouter();

    const convertToBase64 = (e: any) => {
        var reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result?.toString());
        };
        reader.onerror = (err) => {
            console.log("Filereader err : ", err);
        }
    }

    useEffect(() => {
        var token = localStorage.getItem('sessionToken');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?token=${token}`).then(res => {
            setuserObjectId(res.data['_id']);
            setUsername(res.data['username']);
        }).catch(err => console.log(err))
    }, [])

    const handleUpload = async () => {
        console.log({
            postName: imageTitle,
            uploadedBy: userObjectId,
            imageData: image
        });
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`, {
            postName: imageTitle,
            uploadedBy: userObjectId,
            imageData: image,
            username: username
        }).then(res => {
            console.log("uploaded ", res.data);
            router.push('/home');
        }).catch(err => {
            console.log("image upload error : ", err);
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-gray-500 flex items-center justify-center flex-col p-10  rounded-lg">
                    <input className="sibebar-li-style px-8 m-2 mb-6 text-black bg-gray-400  rounded-lg flex items-center text-center"
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                    />
                    <div className="flex flex-col items-center justify-center">
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
                        <div className="p-2">
                            <span>Post Title : </span>
                            <input type="text" name="" id="" className="text-black rounded-2xl p-1 px-3" onChange={(e) => setImageTitle(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="sibebar-li-style mt-8 text-black bg-gray-400 hover:bg-blue-500 rounded-full flex items-center text-center"
                                onClick={handleUpload}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UploadImage;
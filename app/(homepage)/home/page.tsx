'use client';

import ImgBox from '@/components/ImgBox'
import SideBar from '@/components/Sidebar'
import axios from 'axios';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

type Image = {
  imageData: string,
  uploadedBy: {
    username: string
  },
  _id: string,
  postName: string
}

export default function Home() {

  const router = useRouter();
  const [sessionToken, setSessionToken] = useState<string | undefined>('');
  const [sharedImages, setSharedImages] = useState([]);

  useEffect(() => {
    var token = !localStorage.getItem('sessionToken') ? '' : localStorage.getItem('sessionToken');
    if (!token) {
      router.push('/login');
    }
    setSessionToken(token?.toString())
  }, [setSessionToken, router])

  useEffect(() => {
    var token = localStorage.getItem('sessionToken');
    axios.get(`http://localhost:8080/user?token=${token}`).then(res => {
      setSharedImages(res.data['sharedImages']);
    }).catch(err => console.log(err))

  }, [])

  useEffect(() => {
    axios.get('http://localhost:8080/images').then((res) => {
      setSharedImages(res.data);
      console.log(res.data);
    }).catch(err => console.log("get all images error", err))
  }, [])

  return (
    <div className='h-screen flex'>
      <div className='w-[180px] h-full'>
        <SideBar sessionToken={sessionToken} />
      </div>
      <div className='p-6 flex w-full h-full ml-3'>
        <div className='flex flex-wrap w-full h-80'>
          {
            sharedImages.map((image: Image) => {
              return <ImgBox key={image._id} image={image.imageData} uploadedBy={image.uploadedBy.username} postName={image.postName}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

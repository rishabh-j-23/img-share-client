'use client';

import ImgBox from '@/components/ImgBox'
import MobileNavBar from '@/components/navbar/MobileNavBar';
import SideBar from '@/components/navbar/Sidebar'
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
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?token=${token}`).then(res => {
      setSharedImages(res.data['sharedImages']);
    }).catch(err => console.log(err))

  }, [])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images`).then((res) => {
      setSharedImages(res.data);
    }).catch(err => console.log("get all images error", err))
  }, [])

  return (
    <>
      <div className='h-screen flex w-screen '>
        <div className='lg:w-[180px] lg:h-full lg:block hidden '>
          <SideBar sessionToken={sessionToken} />
        </div>
        <div className='sm:block lg:hidden '>
          <MobileNavBar />
        </div>
        <div className='flex w-full h-full lg:ml-3 lg:p-6 '>
          <div className='flex flex-wrap w-full h-80 '>
            {
              sharedImages.length == 0 ? <div className='flex items-center justify-center h-full w-full'>Loading....</div> :
                sharedImages.toReversed().map((image: Image) => {
                  return (
                    <ImgBox key={image._id} image={image.imageData} uploadedBy={image.uploadedBy.username} postName={image.postName} />
                  )
                })
            }
            <div className='pb-20 lg:pb-0 lg:hidden sm:block opacity-0'>Mobile Nav Padding</div>
          </div>
        </div>
      </div>
    </>
  )
}

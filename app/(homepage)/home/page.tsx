'use client';

import Post from '@/components/post/Post'
import MobileNavBar from '@/components/navbar/MobileNavBar';
import SideBar from '@/components/navbar/Sidebar'

import axios from 'axios';
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

type Image = {
  imageData: string,
  uploadedBy: {
    username: string
  },
  _id: string,
  postName: string,
  description: string
}

export default function Home() {

  const router = useRouter();
  const [sessionToken, setSessionToken] = useState<string | undefined>('');
  const [sharedImages, setSharedImages] = useState([]);

  useEffect(() => {
    var token = !localStorage.getItem('sessionToken') ? '' : localStorage.getItem('sessionToken');
    if (!token) {
      redirect('/');
    }
    setSessionToken(token?.toString())
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images`, { headers: { sessionToken: token } }).then((res) => {
      setSharedImages(res.data);
    }).catch(err => console.log("get all images error", err))
  }, [])

  return (
    <>
      <div className='h-screen flex lg:flex-row flex-col w-full ' suppressHydrationWarning>
        {/* All post mapping */}
        <div className='h-full w-full'>
          <div className='flex flex-col w-auto h-auto lg:flex-wrap justify-center lg:ml-[260px]'>
            {
              sharedImages.length == 0 ? <div className='flex items-center justify-center h-screen lg:w-[40vw] lg:ml-0'>Loading....</div> :
                sharedImages.map((image: Image) => {
                  return (
                    <Post key={image._id} id={image._id} image={image.imageData} uploadedBy={image.uploadedBy.username} postName={image.postName} description={image.description} />
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

{/* <div className='flex flex-col w-auto h-auto lg:flex-wrap '>
  {
    sharedImages.length == 0 ? <div className='flex items-center justify-center h-full w-full'>Loading....</div> :
      sharedImages.toReversed().map((image: Image) => {
        return (
          <ImgBox key={image._id} image={image.imageData} uploadedBy={image.uploadedBy.username} postName={image.postName} />
        )
      })
  }
  <div className='pb-20 lg:pb-0 lg:hidden sm:block opacity-0'>Mobile Nav Padding</div>
</div> */}

// <div className='flex w-full h-full lg:ml-3 lg:p-6 bg-neutral-800'>
// <div className='flex flex-col h-full'>
//   {
//     sharedImages.length == 0 ? <div className='flex items-center justify-center h-full w-full'>Loading....</div> :
//       sharedImages.toReversed().map((image: Image) => {
//         return (
//           <ImgBox key={image._id} image={image.imageData} uploadedBy={image.uploadedBy.username} postName={image.postName} />
//         )
//       })
//   }
// </div>
// </div>
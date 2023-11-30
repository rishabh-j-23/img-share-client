'use client';

import Post from '@/components/post/Post'

import axios from 'axios';
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { CSSProperties } from 'react';

type Image = {
  imageData: string,
  uploadedBy: string,
  username: string,
  _id: string,
  postName: string,
  description: string
}

const override: CSSProperties = {
  display: "block",
  borderColor: "white",
};

export default function Home() {

  const [sessionToken, setSessionToken] = useState<string | undefined>('');
  const [sharedImages, setSharedImages] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0); // To track the current post being loaded

  useEffect(() => {
    var token = !localStorage.getItem('sessionToken') ? null : localStorage.getItem('sessionToken');
    setSessionToken(token?.toString())
  }, [])

  useEffect(() => {
    // get token from local storage
    const token = localStorage.getItem('sessionToken');

    // send get request to api to get all the images/posts
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images`, { headers: { sessionToken: token } }).then((res) => {
      setSharedImages(res.data);
      console.log(res.data[1]);
    }).catch(err => console.log("get all images error", err))
  }, [])

  useEffect(() => {
    // Load posts one by one with a delay
    const timer = setTimeout(() => {
      if (currentPostIndex < sharedImages.length) {
        setCurrentPostIndex(prevIndex => prevIndex + 1);
      }
    }, 200);

    // Clear the timer when all posts have been loaded
    return () => clearTimeout(timer);
  }, [currentPostIndex, sharedImages])

  const currentPost = sharedImages.slice(0, currentPostIndex);

  return (
    <>
      <div className='h-screen flex lg:flex-row flex-col w-full ' suppressHydrationWarning>
        {/* All post mapping */}
        <div className='h-full w-full'>
          <div className='flex flex-col w-auto h-auto lg:flex-wrap justify-center lg:ml-[260px]'>
            {/* {currentPost.length === 0 && sharedImages.length === 0 && (
              <div className='flex items-center justify-center h-screen lg:w-[40vw] lg:ml-0 '>
                <BounceLoader color='#fff' loading={true} size={40} />
              </div>
            )} */}
            <Suspense
              fallback={
                <div className='flex items-center justify-center h-screen lg:w-[40vw] lg:ml-0 '>
                  <BounceLoader color='#fff' loading={true} size={40} />
                </div>
              }
            >
              {currentPost.length === 0 && sharedImages.length > 0 && (
                <div className='flex items-center justify-center h-screen lg:w-[40vw] lg:ml-0'>No posts available.</div>
              )}
              {currentPost.map((image: Image) => (
                <Post key={image._id} id={image._id} uploadedBy={image.username} postName={image.postName} description={image.description} />
              ))}
            </Suspense>
            <div className='pb-20 lg:pb-0 lg:hidden sm:block opacity-0'>Mobile Nav Padding</div>
          </div>
        </div>

      </div>
    </>
  )
}
'use client';

import ImgBox from "@/components/ImgBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Post = {
    _id: string,
    imageData: string,
    uploadedBy: string,
    postName: string,
    username: string
}

const SearchPage = () => {

    const [searchPost, setSearchPost] = useState<string>('');
    const [relevantPosts, setRelevantPosts] = useState([]);
    const [searching, setSearching] = useState(false)

    const router = useRouter();

    const handleSearch = async () => {
        if (searchPost == '') {
            return;
        }
        setSearching(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/search?searchPost=${searchPost}`).then(res => {
            if (res.status == 200) {
                setRelevantPosts(res.data);
            }
        });
        setSearching(false);
    }

    return (
        <div className="h-screen flex flex-col lg:ml-[180px] sm:ml-0">
            <div className="flex justify-center ">

                <input type="text" name="searchbar" id="searchbar"
                    placeholder="Search for post"
                    className=" border-solid border-2 m-3 rounded-full p-1 px-3 text-black "
                    onChange={(event) => {
                        setSearchPost(event.target.value);
                    }}
                />
                <button className="bg-slate-400 border-solid border-2 m-3 mx-4 rounded-full p-1 px-3 hover:bg-blue-500"
                    onClick={() => {
                        handleSearch();
                    }}
                >
                    Search
                </button>
            </div>
            <div className="text-center w-full">
                {searching && <div>Searching....</div>}
            </div>
            <div className="flex flex-wrap p-4 lg:m-1/4">
                {
                    relevantPosts.length === 0 ? <div className="text-center w-full p-10">No post by that name</div> :
                        relevantPosts.map((post: Post) => {
                            return <ImgBox key={post._id} image={post.imageData} uploadedBy={post.username} postName={post.postName} />
                        })
                }
            </div>
        </div>
    );
}

export default SearchPage;
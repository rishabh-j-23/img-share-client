import Link from "next/link";

const MobileNavBar = () => {
    return (
        <div
            className="
                fixed bottom-[3%] w-screen h-15 bg-white scroll-auto text-black 
                rounded-full
                "
        >
            <div className="flex p-2 items-center justify-around">
                <div className="flex p-2 items-center justify-center border-r-gray-400 border-r pr-4
                ">
                    <Link href={'/profile'}>Profile</Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400 border-r pr-4 pl-0">
                    <Link href={'/uploadImage'}>Upload</Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400 border-r pr-4 pl-0">
                    <Link href={'/search'}>Search</Link>
                </div>
                <div className="flex p-2 items-center justify-center ">
                    <Link href={'/explore'}>Explore</Link>
                </div>
            </div>
        </div>
    );
}

export default MobileNavBar;
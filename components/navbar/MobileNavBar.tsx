import Link from "next/link";
import Button from "../ui/button/Button";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { TiUpload } from "react-icons/ti";
import { HiOutlineSearchCircle } from "react-icons/hi";

const MobileNavBar = () => {
    return (
        <div
            className="
                fixed bottom-[3%] w-screen h-15 bg-white scroll-auto text-black 
                rounded-full
                "
        >
            <div className="flex p-2 items-center justify-evenly text-center text-2xl">
                <div className="flex p-2 items-center justify-center border-r-gray-400 
                ">
                    <Link href={'/home'}><Button buttonIcon={<AiOutlineHome />}/></Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400 pl-0">
                    <Link href={'/uploadImage'}> <Button buttonIcon={<TiUpload />}/></Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400 pl-0">
                    <Link href={'/profile'}><Button buttonIcon={<AiOutlineUser />}/></Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400 pl-0">
                    <Link href={'/search'}><Button buttonIcon={<HiOutlineSearchCircle />}/></Link>
                </div>
            </div>
        </div>
    );
}

export default MobileNavBar;
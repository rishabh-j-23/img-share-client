import Link from "next/link";
import Button from "../ui/button/Button";
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { TiUpload } from "react-icons/ti";

const MobileNavBar = () => {
    return (
        <div
            className="
                fixed bottom-0 w-screen h-15 bg-white scroll-auto text-black 
                rounded-md
                "
        >
            <div className="flex p-2 items-center justify-evenly text-center text-2xl">
                <div className="flex p-2 items-center justify-center border-r-gray-400">
                    <Link href={'/home'}><Button buttonIcon={<AiOutlineHome />} /></Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400">
                    <Link href={'/upload'}> <Button buttonIcon={<TiUpload />} /></Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400">
                    <Link href={'/profile'}><Button buttonIcon={<AiOutlineUser />} /></Link>
                </div>
                <div className="flex p-2 items-center justify-center border-r-gray-400">
                    <Link href={'/search'}><Button buttonIcon={<AiOutlineSearch />} /></Link>
                </div>
            </div>
        </div>
    );
}

export default MobileNavBar;
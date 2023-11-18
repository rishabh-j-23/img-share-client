import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiSolidLogOut } from "react-icons/bi";
import Tag from "../post/Tag";

type AvatarProps = {
  username: string,
  email?: string,
  logoutBtn?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ username, email, logoutBtn }) => {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    router.push('/login');
  }

  return (
    <div className="flex flex-col hover:cursor-pointer text-white justify-center items-center">
      {username &&
        <div className="flex items-center justify-center">
          <Tag name="user" />
          <span className="text-sm"><b className="text-base">{username}</b></span>
        </div>
      }
      <div>
        {logoutBtn && <button className="border-solid border-white border-2 p-1 mt-6 rounded-full m-1 hover:bg-blue-500"
          onClick={handleLogout}
        >
          <div className="flex flex-row items-center justify-center text-2xl">
            <BiSolidLogOut />
          </div>
        </button>}
      </div>
    </div>
  )
}

export default Avatar
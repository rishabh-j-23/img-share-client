import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
      <div className="">
        <span className="text-sm">user : <b className="text-base">{username}</b></span>
      </div>
      <div className="">
        <i className="text-sm">{email}</i>
      </div>
      <div>
        {logoutBtn && <button className="border-solid border-white border-2 p-1 mt-6 rounded-full m-1 hover:bg-blue-500"
          onClick={handleLogout}
        >
          Logout
        </button>}
      </div>
    </div>
  )
}

export default Avatar
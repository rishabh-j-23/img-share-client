'use client';

import RegisterForm from "@/components/forms/RegisterForm";

const Register = () => {

    return (
        <div className='h-screen flex items-center justify-center '>
            <div className='border-solid border-white  bg-slate-50 border-l rounded-md m-[3%] lg:w-2/5'>
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
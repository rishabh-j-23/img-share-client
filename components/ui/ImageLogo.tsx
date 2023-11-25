import logoDark from '@/public/logo-dark.png'

import Image from 'next/image';

const ImageLogo = () => {
    return (
        <div className="lg:block hidden w-[300px] h-[300px]">
            <Image
                src={logoDark}
                width={900}
                height={900}
                alt="logo"
            />
        </div>
    );
}

export default ImageLogo;
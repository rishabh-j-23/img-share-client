import Image from "next/image";
import pic from '@/public/placeholder/placeholder-image.jpg'

type ImgBoxProps = {
    image: string,
    uploadedBy: string,
    postName: string,
}
const ImgBox: React.FC<ImgBoxProps> = ({
    image, uploadedBy, postName
}) => {

    return (
        <div className="lg:w-72 bg-neutral-900 rounded-md flex flex-col items-center p-3 m-0 my-2 overflow-clip lg:m-2">
            
            <div className="w-full h-full">
                <Image
                    src={image ? image : pic}
                    alt={postName}
                    className="rounded-md"

                    width={1000}
                    height={1000}
                />
            </div>
            <div className="flex flex-col text-center">
                <span className="text-base mt-2">{postName}</span>
                <p className="text-xs">
                    <i>Uploaded by</i> 
                    <span className="text-sm p-1">{uploadedBy}</span>
                </p>
            </div>
        </div>
    );
}

export default ImgBox;
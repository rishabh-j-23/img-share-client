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
        <div className="w-72 bg-gray-600 rounded-md flex flex-col items-center p-3 m-2 overflow-clip">
            
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
import Logo from "./ui/Logo";
import Logout from "./ui/button/Logout";

const MobileHeader = () => {
    return ( 
        <div className="flex justify-between items-center absolute w-screen px-4 bg-black rounded-full h-11">
            <div>
                <Logo />
            </div>
            <div>
                <Logout />
            </div>
        </div>
    );
}
 
export default MobileHeader;
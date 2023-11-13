import Logo from "../ui/Logo";
import Logout from "../ui/button/Logout";

const MobileHeader = () => {
    return (
        <div className="flex justify-between items-center fixed top-0 w-screen px-4 h-12 bg-gray-950 rounded-b-md">
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
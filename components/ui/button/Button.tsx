type ButtonProps = {
    buttonType?: string,
    buttonIcon?: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({
    buttonType, buttonIcon
}) => {
    return ( 
        <button className="flex items-center justify-center">
            <div className="px-2">
                {buttonIcon}
            </div>
            <span>{buttonType}</span>
        </button>
     );
}
 
export default Button;
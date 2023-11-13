type TagProps = {
    name: string,
}

const Tag = ({
    name
}: TagProps) => {
    return (
        <div className="bg-zinc-500 p-1 rounded-md mr-1">
            <span className="">
                {name}
            </span>
        </div>

    );
}

export default Tag;
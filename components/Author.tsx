import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Author as IAuthor } from "types";

const Author: FC<{author: IAuthor}> = ({author}) => {
    return <div className="relative mt-20 mb-8 p-10 rounded-lg bg-black bg-opacity-20 text-center">
        <div className="absolute left-0 right-2 -top-14">
            <Image 
                unoptimized
                alt={author.name}
                src={author.photo.url}
                width='100px'
                height='100px'
                className="rounded-full align-middle"
            />
        </div>
        <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
        <p className="text-white text-medium">{author.bio}</p>
    </div>
};

export default Author;
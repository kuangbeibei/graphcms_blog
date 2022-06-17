import { FC } from "react";
import moment from "moment";
import Link from "next/link";
import Image from 'next/image';
import { Post } from "types";

const PostCard:FC <{ post: Post }> = ({ post }) => {    
	return (
		<div className="bg-white shadow-lg rounded-lg p-0 pb-12 mb-8 ">
			<div className="relative overflow-hidden shadow-md pb-80 mb-6">
				<img
					className="absolute object-top w-full shadow-lg rounded-t-lg"
					src={post.featuredImage.url}
					alt={post.title}
				/>
			</div>
            <h1 className="transition duration-700 text-3xl font-semibold text-center mb-4 lg:mb-6 hover:text-pink-700">
                <Link href={`/post/${post.slug}`}>{
                    post.title
                }</Link>
            </h1>
            <div className="block lg:flex flex-col items-center justify-center mb-6 w-full">
                <div className="flex justify-center items-center space-x-2 mb-4 lg:mb-2 lg:wx-auto">
                    <Image width="30px" height="30px" className="drop-shadow-lg  font-medium" src={post.author.photo.url} alt={post.author.name} />
                    <p className="text-gray-500 mt-1 text-lg">{post.author.name}</p>
                </div>
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="align-middle text-gray-500">{moment(post.createAt).format('MMM DD, YYYY')}</span>
                </div>
            </div>
            <p className="text-center text-lg text-gray-600 px-4 font-normal mb-8 lg:px-20">{post.excerpt}</p>
            <div>
                <Link href={`/post/${post.slug}`}>
                    <span className="block mx-auto rounded-full font-normal text-sm text-center px-3 py-2 w-40 bg-pink-600 text-white transition duration-400 hover:-translate-y-1 hover:bg-pink-500 cursor-pointer">Continue Reading</span>
                </Link>
            </div>
		</div>
	);
};

export default PostCard;

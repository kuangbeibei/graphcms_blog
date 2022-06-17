import { FC, useState, useEffect } from "react";
import { Categories, WidgetPost } from "types";
import { getRecentPosts, getRelatedPosts } from "Services";
import moment from "moment";
import Link from "next/link";

const PostWidget: FC<{
    categories?: Array<string>,
    slug?: string
}> = ({categories, slug}) => {
    const [widgetPosts, setWidgetPosts] = useState<Array<WidgetPost>>([]);

    useEffect(() => {
        if (categories && slug) {
            getRelatedPosts(slug, categories).then(result => setWidgetPosts(result))
        } else {
            getRecentPosts().then(result => setWidgetPosts(result))
        }
    }, [slug])

    return <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl font-semibold mb-8 border-b pb-4">
            {
                slug ? 'Related Posts' : 'Recent Posts'
            }
        </h3>
        {
            widgetPosts.map((post) => (
                <div key={post.title} className="flex items-center mb-4">
                    <div className="w-16 flex-none">
                        <img width={30} height={30} className="rounded-full" alt={post.title} src={post.featuredImage.url}/>
                    </div>
                    <div className="flex-grow">
                        <p className="text-gray-600 text-xs mb-1">
                            {
                                moment(post.createdAt).format('MMM DD, YYYY')
                            }
                        </p>
                        <Link className="text-sm" href={`/post/${post.slug}`}>{post.title}</Link>
                    </div>
                </div>
            ))
        }
    </div>
}

export default PostWidget;

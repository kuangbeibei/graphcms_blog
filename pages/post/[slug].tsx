import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { PostDetail, Author, Comment, CommentForm, PostWidget, Categories } from 'Components';
import { getPosts, getPostDetails } from 'Services';
import {Post} from "types";

const PostDetails: NextPage<{post: Post}> = ({post}) => {    
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author}/>
                    <CommentForm slug={post.slug} />
                    <Comment slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className='relative top-8 lg:sticky'>
                        <PostWidget categories={post.categories.map(category => category.slug)} slug={post.slug} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths<{}> = async () => {
    const posts = await getPosts();
    return {
        // generated at build time
        paths: posts.map(({
            node
        }: Post) => ({
            params: {
                slug: node.slug
            }
        })),
        fallback: false,
      }
}


export const getStaticProps: GetStaticProps<{}> = async ({params}) => {
    const post = await getPostDetails(params?.slug as any as string)
    
    return {
        props: {
            post
        }
    }
}
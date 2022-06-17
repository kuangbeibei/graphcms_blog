import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { PostCard, PostWidget } from "Components"
import { getCategoryPosts, getCategories } from 'Services';
import { Post, Categories } from 'types'

const Category: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className="grid grid-cols-1 lg:gap-12 lg:grid-cols-12">
                {/* posts */}
                <div className='col-span-1 lg:col-span-8'>
                    {
                        posts.length && posts.map((post, index) => <PostCard post={post.node} key={index} />)
                    }
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <PostWidget />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;

export const getStaticPaths: GetStaticPaths<{}> = async () => {
    const categories = await getCategories();
    return {
        // generated at build time
        paths: categories.map((category: Categories) => ({
            params: {
                slug: category.slug
            }
        })),
        fallback: false,
    }
}


export const getStaticProps: GetStaticProps<{}> = async ({ params }) => {
    try {
        const posts = await getCategoryPosts(params?.slug as any as string)

        return {
            props: {
                posts
            }
        }
    } catch (e) {
        console.log('getCategoryPosts 出错了: ', e);
        return {
            props: {
                posts: {}
            }
        }
    }
}
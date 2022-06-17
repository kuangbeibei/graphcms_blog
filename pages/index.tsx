import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, PostWidget, Categories } from "Components";
import { getPosts } from "Services";
import { Post } from "types";

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog Powered by nextjs & graphql</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:gap-12 lg:grid-cols-12">
        {/* posts */}
        <div className="col-span-1 lg:col-span-8">
          {posts.length &&
            posts.map((post, index) => (
              <PostCard post={post.node} key={index} />
            ))}
        </div>

        {/* widget */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const posts = (await getPosts()) || [];
    return {
      props: { posts },
    };
  } catch (e) {
    console.log("getPosts出错了: ", e);
    return {
      props: {
        posts: {},
      },
    };
  }
}

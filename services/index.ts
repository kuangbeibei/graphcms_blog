import {gql, request} from "graphql-request";
import { CommentObj } from "types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as any as string;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        excerpt
                        slug
                        title
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges
}

export const getPostDetails = async (slug: string) => {
    const query = gql`
        query getPostDetails($slug: String!) {
            post(where: {slug: $slug}){
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                excerpt
                slug
                title
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }       
    `
    const result = await request(graphqlAPI, query, {slug});
    return result.post;
}

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                createdAt
                slug
                featuredImage {
                    url
                }
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.posts
}

export const getRelatedPosts = async (slug: string, categories: Array<String>) => {
    const query = gql`
        query GetPostDetails(
            $slug: String!,
            $categories: [String!],
        ) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                createdAt
                slug
                featuredImage {
                    url
                }
            }
        }
    `
    const result = await request(graphqlAPI, query, {slug, categories});

    return result.posts
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories() {
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.categories
}

export const getCategoryPosts = async (slug: string) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
}

export const getComments = async (slug: string) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: {
                post: {
                    slug: $slug
                }
            }) {
                name
                email
                comment
                createdAt
            }
        }
    `

    const result = await request(graphqlAPI, query, {slug});
    return result.comments
}

export const submitComment = async (commentObj: CommentObj) => {
    try {
        const result = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(commentObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.json
    } catch(e) {
        console.log('submitt comment error: ', e);
        
    }
}
/**
 * Any file inside this folder pages/api is mapped to /api/* 
 * and will be treated as an API endpoint instead of a page.
 */

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as any as string;
const graphqlCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req: any, res: any) {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphqlCMSToken}`
      }
    })

    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: {
          name: $name,
          email: $email,
          comment: $comment,
          post: {
            connect: {
              slug: $slug
            }
          }
        }) {id}
      }
    `

    try {
      const result = await graphQLClient.request(query, req.body);
      return res.status(200).send(result);
    } catch(e) {
      console.log('submit comments error on api-side: ', e);
      return res.status(500).send(e)
    }
}


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

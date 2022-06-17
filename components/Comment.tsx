import { FC, useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "Services";
import { CommentObj } from "types";

const Comment: FC<{slug: string}> = ({slug}) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments(slug).then(result => {
            setComments(result)
        })
    }, [slug])
    return <>
        {
            comments.length ? (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl font-semibold mb-8 border-b pb-4">
                        {comments.length}
                        {` `}
                        Comments
                    </h3>
                    {
                        comments.map((comment: CommentObj) => (
                            <div key={comment.createdAt} className="border-b border-gray-100 mb-4 pb-4">
                                <p className="mb-4">
                                    <span className="font-semibold ">{comment.name}</span>
                                    {` `}
                                    on
                                    {` `}
                                    {moment(comment.createdAt).format('MMM DD, YYYY')}
                                </p>
                                <p className="whitespace-pre-line text-gray-600">
                                    {parse(comment.comment)}
                                </p>
                            </div>
                        ))
                    }
                </div>
            ) : null
        }
    </>
};

export default Comment;
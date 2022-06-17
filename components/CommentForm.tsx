import { FC, useRef, useState, useEffect } from "react";
import { submitComment } from "Services";

interface RefObject {
    value: string | undefined
  }

const CommentForm: FC<{slug: string}> = ({slug}) => {
    const [error, setError] = useState<boolean>(false);
    const [localStorage, setLocalStorage] = useState<{
        name: string,
        email: string
    } | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const commentEl = useRef<HTMLTextAreaElement>(null);
    const nameEl = useRef<HTMLInputElement>(null);
    const emailEl = useRef<HTMLInputElement>(null);
    const storeDataEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        nameEl.current!.value = window.localStorage.getItem('name') || '';
        emailEl.current!.value = window.localStorage.getItem('email') || '';
    }, [])

    const handleCommentSubmission = () => {
        setError(false);

        const {value: comment} = commentEl.current!;
        const {value: name} = nameEl.current!;
        const {value: email} = emailEl.current!;  
        const {checked: storeData} = storeDataEl.current!;
        
        if (!comment || !name || !email) {
            return setError(true)
        }

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }

        const commentObj = {comment, name, email, slug};
        submitComment(commentObj).then(result => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        })
    }

    return <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-lg font-semibold mb-8 border-b pb-4">Leave a Reply</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <textarea ref={commentEl} name="comment" placeholder="Comment" className="w-full outline-none p-4 rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input ref={nameEl} name="name" placeholder="Name" className="w-full outline-none px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-200"/>
            <input ref={emailEl} name="email" placeholder="Email" className="w-full outline-none px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-200"/>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
                <input type="checkbox" ref={storeDataEl} id="storeData" name="storeData" value="true" />
                <label className="text-gray-700 text-sm ml-1 cursor-pointer" htmlFor="storeData">Save my name and email for next time I comment</label>
            </div>
        </div>
        {
            error && <p className="text-xs text-red-500">All fields are required.</p>
        }
        <div className="mt-8">
            <button type="button" onClick={handleCommentSubmission} className="bg-pink-600 text-white rounded-full font-normal text-sm px-3 py-2 cursor-pointer hover:bg-indigo-900 transition duration-300 ease">
                post comment
            </button>
            {
                showSuccessMessage && <span className="float-right text-green-500 font-semibold text-base mt-3">Comment submitted for review.</span>
            }
        </div>
    </div>
};

export default CommentForm;
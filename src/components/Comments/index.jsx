import { useEffect, useState } from "react";

const Comments = ({props}) => {
    const mockComments = [
        {
            id: 1,
            content: "test comment1",
            like_users: [2],
            author: 1,
            created_at: "2022-11-22T08:09:59.900509Z"
        },
        {
            id: 2,
            content: "test comment2",
            like_users: [],
            author: 2,
            created_at: "2022-11-22T08:09:54.233976Z"
        },
    ];
    // const { comments } = props; // comments from props
    const [commentList, setCommentList] = useState(mockComments); // state for comments
    const [newContent, setNewContent] = useState(''); // state for new comment

    useEffect(() => {

    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            id: 3,
            content: newContent,
            like_users: [],
            author: 1,
            created_at: "2023-02-15T08:09:59.900509Z",
        };
        // add api call for creating new comment here

        setCommentList([...commentList, newComment]);
    };

    return (
        <>
            <h1>Comments</h1>
            <div>
                <input type="text" value={newContent} onChange={(e) => setNewContent(e.target.value)}></input>
                <button onClick={handleCommentSubmit}>submit</button>
            </div>
            {commentList.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.author} : {comment.content}</p>
                    <p>{comment.created_at}</p>
                </div>
            ))}
        </>
    )
};

export default Comments;

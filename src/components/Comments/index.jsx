import { useEffect, useState } from "react";

const Comments = () => {
    const mockComments = [
        {
            id: 1,
            content: "멋사 11기 화이팅!!",
            like_users: [2],
            author: 1,
            created_at: "2023-02-12T08:09:59.900509Z"
        },
        {
            id: 2,
            content: "멋사 좋아요~~",
            like_users: [],
            author: 2,
            created_at: "2022-11-22T08:09:54.233976Z"
        },
    ];
    const [commentList, setCommentList] = useState(mockComments); // state for comments
    const [newContent, setNewContent] = useState(''); // state for new comment

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            id: 3,
            content: newContent,
            like_users: [],
            author: 1,
            created_at: Date.now(),
        };
        // add api call for creating new comment here

        setCommentList([...commentList, newComment]);
        setNewContent('');
    };

    useEffect(() => {
        console.log(new Date(commentList[0].created_at))
    }, [commentList])

    return (
        <div className="w-full mt-5 self-start">
            <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>

            {commentList.map((comment) => {
                const date = new Date(comment.created_at);
                const year = date.getFullYear();
                let month = date.getMonth() + 1;
                month = month < 10  ? `0${month}` : month;
                const day = date.getDate();
                return  (
                    <div key={comment.id} className="flex justify-between">
                        <p className="text-lg mr-4">{comment.content}</p>
                        <span>{year}.{month}.{day}</span>
                    </div>
                )}
            )}

            <div className="flex flex-col items-center">
                <input 
                    type="text" 
                    value={newContent} 
                    placeholder="댓글을 입력해주세요"
                    className="input mt-10 mb-3"
                    onChange={(e) => setNewContent(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleCommentSubmit(e);
                        }
                    }} />
                <button
                    className="button py-2 px-10" 
                    onClick={handleCommentSubmit}>
                    submit
                </button>
            </div>
        </div>
    )
};

export default Comments;

import { useEffect, useState } from "react";
import comments from "/Users/jeon-eojin/Desktop/likelion/react/src/data/comments.js";
import CommentElement from "./CommentElement";

const Comment = () => {
  useEffect(() => {
    console.log(comments);
  }, []);
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState(comments);
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [newCommentContent, setNewCommentContent] = useState("");
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: commentList.length + 1,
      content: newCommentContent,
      created_at: new Date().toISOString(),
      author: { id: commentList.length, username: "eojin" },
    };

    setCommentList([...commentList, newComment]);
    setNewCommentContent("");
  };
  // TODO 4: comment Delete 하는 함수 만들어죠
  const handleDelete = (id) => {
    const updatedComments = commentList.filter((comment) => comment.id !== id); // 삭제할 댓글을 제외한 새로운 댓글 리스트 생성
    setCommentList(updatedComments);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>

      {commentList &&
        commentList.map((comment) => (
          <CommentElement
            key={comment.id}
            comment={comment}
            onDelete={handleDelete}
          />
        ))}

      <form
        className="flex items-center justify-center mt-10 gap-4"
        onSubmit={handleCommentSubmit}
      >
        <input
          className="input"
          type="text"
          placeholder="댓글을 입력하세요"
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        />
        <button
          className="bg-orange-400 bg-opacity-100 rounded-full text-white text-opacity-100 text-lg font-semibold leading-tight py-3 px-5"
          type="submit"
        >
          comment
        </button>
      </form>
    </div>
  );
};

export default Comment;

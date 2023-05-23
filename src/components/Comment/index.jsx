import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = () => {
  // TODO 1: comments 불러와서 저장
  const [commentList, setCommentList] = useState(comments);

  // TODO 2: comment추가하는 input 관리
  const [commentInput, setCommentInput] = useState("");

  // TODO 3: comment Form 제출됐을때 실행되는 함수
  const commentSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: commentList.length + 1,
      content: commentInput,
      created_at: new Date().toISOString(),
    };

    setCommentList([...commentList, newComment]);
    setCommentInput("");
  };

  // TODO 4: comment Delete 하는 함수
  const commentDelete = (id) => {
    const newCommentList = commentList.filter((comment) => comment.id !== id);
    setCommentList(newCommentList);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>

      {commentList.map((comment) => (
        <div className="w-full flex flex-row items-center" key={comment.id}>
          <CommentElement
            id={comment.id}
            content={comment.content}
            created_at={comment.created_at}
            post={comment.post}
            author={comment.author}
            commentDelete={commentDelete}
          />
        </div>
      ))}

      <form
        onSubmit={commentSubmit}
        className="flex flex-row w-full items-center"
      >
        <input
          className="w-full border-2 border-gray-300 rounded-2xl px-5 py-4 mt-10 mb-2 text-white bg-transparent"
          type="text"
          placeholder="댓글을 입력해주세요"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button className="button mx-4 py-4 px-5 mt-10 mb-2">comment</button>
      </form>
    </div>
  );
};

export default Comment;

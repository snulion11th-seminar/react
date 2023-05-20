import { useState, useEffect } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

export const Comment = () => {
  // TODO 1: comments 불러와서 저장해야겟즤
  const [commentList, setCommentList] = useState();
  useEffect(() => {
    setCommentList(comments);
  }, []);

  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [commentInputValue, setcommentInputValue] = useState("");

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: commentList.length + 1,
      content: commentInputValue,
      created_at: new Date(),
      author: {
        id: 1,
        username: "붸잉뷍",
      },
    };

    setCommentList([...commentList, newComment]);
    setcommentInputValue("");
  };



  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>

      {commentList &&
        commentList.map((comment) => {
          return (
            <CommentElement
              comment={comment}
              commentList={commentList}
              setCommentList={setCommentList}
            />
          );
        })}

      {/* // TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
      <form
        className="flex items-center justify-center mt-10 gap-2"
        onSubmit={handleCommentSubmit}
      >
        <input
          className="input placeholder-white"
          placeholder="댓글을 입력해주세요."
          value={commentInputValue}
          onChange={(e) => setcommentInputValue(e.target.value)}
        />

        <button type="submit" className="button">
          Comment
        </button>
      </form>
    </div>
  );
};

import { useState } from "react";
import comments from "../../data/comment";
import { CommentElement } from "./CommentElement";

export const Comment = ({ postId }) => {
  // TODO 1: comments 불러와서 저장해야겟즤
  const [commentList, setCommentList] = useState(
    comments.filter((comment) => comment.post === parseInt(postId))
  );
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [commentInput, setCommentInput] = useState("");
  const [newComment, setNewComment] = useState({
    id: 0,
    content: "",
    created_at: new Date(),
    post: postId,
    author: {
      id: 2,
      username: "user2",
    },
  });

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const handleComment = (e) => {
    setCommentInput(e.target.value);
    setNewComment({
      id: commentList.length + 3,
      content: e.target.value,
      created_at: new Date(),
      post: postId,
      author: {
        id: 2,
        username: "user2",
      },
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setCommentList((commentList) => [...commentList, newComment]);
    setCommentInput("");
  };

  // TODO 4: commet Delete 하는 함수 만들어죠
  const deleteComment = (id) => {
    setCommentList(
      commentList.filter((comment) => {
        return comment.id !== id;
      })
    );
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div>
        {commentList.map((comment) => {
          return (
            <CommentElement
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-center mt-10 gap-2">
        <form className="w-full" onSubmit={handleCommentSubmit}>
          {/* // TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            id="comment"
            value={commentInput}
            className="input"
            onChange={handleComment}
          />
        </form>
        <button className="button" onClick={handleCommentSubmit}>
          comment
        </button>
      </div>
    </div>
  );
};

export default Comment;

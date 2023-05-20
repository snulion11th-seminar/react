import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = ({ postId }) => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState(
    comments.filter((comment) => comment.post === parseInt(postId))
  );
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [commentData, setCommentData] = useState({
    id: commentList.length + 1,
    content: "",
    created_at: new Date(),
    post: 1,
    author: {
      id: 1,
      username: "user1",
    },
  });
  const handleCommentData = (e) => {
    const { id, value } = e.target;
    setCommentData({ ...commentData, [id]: value });
  };
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setCommentList((commentList) => [...commentList, commentData]);
    setCommentData({
      id: commentList.length + 1,
      content: "",
      created_at: new Date(),
      post: 1,
      author: {
        id: 1,
        username: "user1",
      },
    });
  };
  // TODO 4: commet Delete 하는 함수 만들어죠\
  const deleteComment = (e) => {
    const { id } = e;
    setCommentList(
      commentList.filter((comment) => comment.id !== parseInt(id))
    );
  };
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => (
        <CommentElement
          key={comment.id}
          comment={comment}
          deleteComment={deleteComment}
        />
      ))}
      <form className="flex gap-2" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          id="content"
          placeholder="댓글을 입력해주세요."
          className="input h-14"
          onChange={handleCommentData}
          value={commentData.content}
        />
        <button className="button" type="submit">
          comment
        </button>
      </form>
    </div>
  );
};

export default Comment;

import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = ({ post }) => {
  // console.log(post);
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState(comments);
  // TODO 2: comment추가하는 input 관리해줘야겟지

  const [newComment, setNewComment] = useState({
    id: commentList.length + 1,
    content: "",
    created_at: new Date(),
    post: post.id,
    author: { id: "1", username: "1" },
  });

  // console.log(newComment);
  const handleChange = (e) => {
    // console.log(e);
    setNewComment({ ...newComment, content: e.target.value });
  };
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const onSubmit = (e) => {
    e.preventDefault();
    const createdComment = newComment;
    setCommentList([...commentList, createdComment]);
    setNewComment({
      id: commentList.length + 2,
      content: "",
      created_at: new Date(),
      post: post.id,
      author: { id: "1", username: "1" },
    });
    // console.log(commentList);
  };

  // TODO 4: commet Delete 하는 함수 만들어죠
  const deleteComment = (id) => {
    // console.log(commentList);
    setCommentList(commentList.filter((comment) => comment.id !== id));
    // console.log(commentList);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => (
        <div className="w-full flex flex-row">
          <CommentElement
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        </div>
      ))}
      <form
        className="flex items-center justify-center mt-10 gap-2"
        onSubmit={onSubmit}
      >
        <input
          required
          className="form-control input h-14"
          placeholder="댓글을 입력해주세요"
          value={newComment.content}
          onChange={handleChange}
        ></input>
        <button className="button">Comment</button>
      </form>
    </div>
  );
};

export default Comment;

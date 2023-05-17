import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = () => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState(comments);
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleFormData = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, content: value });
  };
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const y = date.getFullYear();
    const m =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const mi =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const s =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const created_at = `${y}-${m}-${d}T${h}:${mi}:${s}Z`;

    const maxID = (arr) => {
      return arr.reduce((max, cur) => (max > cur.id ? max : cur.id));
    };
    const newComment = {
      id: maxID(commentList) + 1,
      content: formData.content,
      created_at: created_at,
      post: 1,
      author: {
        id: 1,
        username: "user1",
      },
    };
    setCommentList([...commentList, newComment]);
    setFormData({ content: "" });
  };

  const deleteComment = (id) => {
    console.log(commentList);
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };
  console.log(commentList);
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div>
        {commentList.map((comment) => (
          <CommentElement comment={comment} deleteComment={deleteComment} />
        ))}
      </div>
      {/* commentElement // <CommentElement /> 가 comment마다 반복시켜야즤 */}
      <form
        className="flex justify-center items-center mt-10 gap-2"
        onSubmit={handleCommentSubmit}
      >
        <input
          required
          className="input w-3"
          placeholder="댓글을 입력해주세요"
          value={formData.content}
          onChange={handleFormData}
        ></input>
        <button className="button">Comment</button>
      </form>
    </div>
  );
};

export default Comment;

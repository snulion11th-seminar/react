import { useState, useEffect } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

export const Comment = ({ postId }) => {
  const [filteredComments, setFilteredComments] = useState([]);
  const [newInput, setNewInput] = useState("");

  useEffect(() => {
    const commentList = comments.filter(
      (comment) => comment.post === parseInt(postId)
    );
    setFilteredComments(commentList);
  }, [postId]);

  const handleCommentInput = (e) => {
    let value = e.target.value;
    setNewInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      content: newInput,
      created_at: Date.now(),
      author: {
        id: 1,
        username: "user1",
      },
    };
    setFilteredComments([...filteredComments, newComment]);
    setNewInput("");
  };

  // TODO 4: commet Delete 하는 함수 만들어죠
  const handleCommentDelete = (id) => {
    setFilteredComments(
      filteredComments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {filteredComments.map((comment) => {
        return (
          <CommentElement
            key={comment.id}
            comment={comment}
            handleCommentDelete={handleCommentDelete}
          />
        );
      })}
      <form className="flex mt-10 gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="input h-14"
          onChange={handleCommentInput}
          value={newInput}
          required
        ></input>
        <button className="button" type="submit" onClick={handleSubmit}>
          comment
        </button>
      </form>
    </div>
  );
};

import { useEffect, useState } from "react";
import CommentElement from "./CommentElement.jsx";
import commentList from "../../data/comment.js";

const Comment = () => {
  const [commentListinPost, setCommentListinPost] = useState(commentList);
  const [commentInputValue, setCommentInputValue] = useState({ content: "" });
  const [editingText, setEditingText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  // show comment in commentList
  useEffect(() => {
    setCommentListinPost(commentList);
  }, []);

  // handle comment input value
  const handleCommentData = (e) => {
    const { id, value } = e.target;
    setCommentInputValue({ ...commentInputValue, [id]: value });
  };

  // add comment
  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: commentListinPost.length + 1,
      post: "post",
      created_at: new Date(),
      author: {
        id: 1,
        username: "베이비",
      },
      content: commentInputValue.content,
    };
    setCommentListinPost([...commentListinPost, newComment]);
    setCommentInputValue({ content: "" });
  };

  //deleteComment
  const deleteComment = (id) => {
    const updatedCommentList = commentListinPost.filter(
      (comment) => comment.id !== id
    );
    setCommentListinPost(updatedCommentList);
  };

  //edit Comment
  const editComment = (id) => {
    const updatedCommentList = commentListinPost.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: editingText };
      }
      return comment;
    });
    setCommentListinPost(updatedCommentList);
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleEditText = (e) => {
    setEditingText(e.target.value);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-2xl font-bold mt-5 mb-3 text-white">댓글💬</h1>
      <div className="py-5 w-full bg-gray-100 text-black border-0 rounded-md font-medium">
        {commentListinPost.map((comment) => (
          <CommentElement
            key={comment.id}
            id={comment.id}
            post={comment.post}
            created_at={comment.created_at}
            author={comment.author}
            content={comment.content}
            commentListinPost={commentListinPost}
            setCommentListinPost={setCommentListinPost}
            deleteComment={deleteComment}
            editComment={editComment}
            setEditingCommentId={setEditingCommentId}
            setEditingText={setEditingText}
            editingCommentId={editingCommentId}
            editingText={editingText}
            handleEditText={handleEditText}
          />
        ))}
      </div>
      <form className="flex items-center justify-center mt-10 gap-2">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          id="content"
          value={commentInputValue["content"]}
          onChange={handleCommentData}
          className="input h-14"
        />
        <button type="submit" class="button" onClick={addComment}>
          💬
        </button>
      </form>
    </div>
  );
};

export default Comment;

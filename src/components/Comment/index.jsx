import { useEffect, useState } from "react";
import CommentElement from "./CommentElement.jsx";
import { getComments } from "../../apis/api.js";
import { createComment } from "../../apis/api.js";

const Comment = ({ postId }) => {
  const [commentInputValue, setCommentInputValue] = useState("");
  const [editingText, setEditingText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentListinPost, setCommentListinPost] = useState([]);

  useEffect(() => {
    const getCommentsAPI = async () => {
      const comments = await getComments(postId);
      setCommentListinPost(comments);
    };
    getCommentsAPI();
  }, [postId]);
  //getComments를 이용해 모든 comment 가져오고 commentList에 담아두기

  // show comment in commentList
  useEffect(() => {
    setCommentListinPost(commentListinPost);
  }, []);

  // handle comment input value
  const handleCommentData = (e) => {
    const { id, value } = e.target;
    setCommentInputValue(value);
  };

  // add comment
  const addComment = (e) => {
    e.preventDefault();
    createComment({ post: postId, content: commentInputValue });
    setCommentInputValue("");
  };

  //deleteComment
  const deleteComment = (id) => {
    const confirmed = window.confirm("삭제할꼬얌?");
    if (confirmed) {
      const updatedCommentList = commentListinPost.filter(
        (comment) => comment.id !== id
      );
      setCommentListinPost(updatedCommentList);
    }
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
            author={comment.author.id}
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
          value={commentInputValue}
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

import { useState, useEffect } from "react";
import CommentElement from "./CommentElement";
import { createComment, getComments, deleteComment } from "../../apis/api";

const Comment = ({ postId }) => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState([]);
  console.log();

  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [inputComment, setInputComment] = useState("");

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const onSubmit = (e) => {
    e.preventDefault();
    createComment({ post: postId, content: inputComment });
    setInputComment("");
    // postId, newContent만 하나의 객체로 만들어 보내줌
  };

  useEffect(() => {
    const getCommentsAPI = async () => {
      const comments = await getComments(postId);
      setCommentList(comments);
    };
    getCommentsAPI();
  }, [postId]);

  // TODO 4: commet Delete 하는 함수 만들어죠
  const handleCommentDelete = async (commentId) => {
    const confirmDelete = window.confirm("정말로 댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
      await deleteComment(commentId);
      window.location.reload();
    }
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div className="flex flex-col">
        {commentList.map((comment) => (
          <CommentElement
            
            key={comment.id}
            comment={comment}
            handleCommentDelete={handleCommentDelete}
          />
        ))}
      </div>
      <form
        className="flex flex-row items-center justify-center mt-10 gap-4"
        onSubmit={onSubmit}
      >
        {/* TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
        <input
          required
          type="text"
          id="comment"
          className="input  "
          placeholder="댓글을 입력해주세요"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <button className="button">comment</button>
      </form>
    </div>
  );
};

export default Comment;

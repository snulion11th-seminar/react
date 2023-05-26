import { useState, useEffect } from "react";
import CommentElement from "./CommentElement";
import { getComments, createComment, deleteComment } from "../../apis/api";

export const Comment = ({ post }) => {
  // 1. comment list 관리
  const [commentList, setCommentList] = useState([]);
  console.log(post);
  useEffect(() => {
    const getCommentAPI = async (post) => {
      const comments = await getComments(post);
      setCommentList(comments);
    };
    getCommentAPI(post);
  }, [post]);

  // comment추가 하는 input 관리
  const [newCommentInputValue, setNewCommentInputValue] = useState("");
  // input값 업데이트 관리
  const handleNewComment = (e) => {
    const newCommentContent = e.target.value;
    setNewCommentInputValue(newCommentContent);
  };

  // comment Form 제출됐을때 실행되는 함수 만들어줘

  // * 새 comment submit되면 기존 코멘트 리스트인 comments에 넣어줌.
  const onClickNewComment = (e) => {
    e.preventDefault();
    createComment({ post: post, content: newCommentInputValue });
    setNewCommentInputValue("");
  };

  // comment 삭제 - commentElement에서 요청할 때 id 같은거 삭제해줌
  const handleCommentDelete = (commentId) => {
    deleteComment(commentId);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div className="">
        {commentList.map((comment) => {
          return (
            <CommentElement
              commentKey={comment.id}
              comment={comment}
              handleCommentDelete={handleCommentDelete}
            />
          );
        })}
      </div>

      <form className="flex items-center justify-center mt-10 gap-2">
        <input
          className="input h-14"
          placeholder="댓글을 입력해주세요"
          type="text"
          value={newCommentInputValue}
          onChange={handleNewComment}
        />
        <input
          className="button"
          type="button"
          value="여기 누르셈"
          onClick={onClickNewComment}
        />
      </form>
    </div>
  );
};

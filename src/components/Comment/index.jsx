import { useState, useEffect } from "react";
import allComments from "../../data/comments";
import CommentElement from "./CommentElement";

export const Comment = ({ post }) => {
  // data 폴더에 comments를 allComments로 불러오고, post 아이디에 적합한 comment만을 comments에 state로 저장
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentList = allComments.filter(
      (comment) => comment.post === post.id
    );
    setComments([...commentList]);
  }, []);

  // comment추가 하는 input 관리
  const [newCommentInputValue, setNewCommentInputValue] = useState("");
  // input값 업데이트 관리
  const handleNewComment = (e) => {
    const newCommentContent = e.target.value;
    setNewCommentInputValue(newCommentContent);
  };

  // comment Form 제출됐을때 실행되는 함수 만들어줘

  // * id number update위해서 tempIdNumber 선언
  const [tempIdNumber, setTempIdNumber] = useState(allComments.length + 1);

  // * 새 comment submit되면 기존 코멘트 리스트인 comments에 넣어줌.
  const onClickNewComment = (e) => {
    if (newCommentInputValue === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const currentTime = new Date();
    const currentTimeStr = currentTime.toISOString();
    const newComment = {
      id: tempIdNumber,
      content: newCommentInputValue,
      created_at: currentTimeStr,
      post: post,
      author: { id: allComments.length, username: "초기값(아무거나 넣어둠)" },
    };
    const newCommentList = [...comments, newComment];
    setComments(newCommentList);
    setNewCommentInputValue("");
    setTempIdNumber((prevId) => prevId + 1); // 임시적으로 id number 1씩 증가시켜줌
  };

  // comment 삭제 - commentElement에서 요청할 때 id 같은거 삭제해줌
  const handleCommentDelete = (commentId) => {
    const updatedArray = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedArray);
  };

  // 5. CommentElement에서 edit되었을 때, comments 업데이트 해줌
  const handleCommentChange = (commentId, newContent) => {
    const updatedArray = comments.map((comment) => {
      if (commentId === comment.id) {
        const currentTime = new Date(); // 날짜도 업데이트 해줌
        const currentTimeStr = currentTime.toISOString();
        return { ...comment, content: newContent, created_at: currentTimeStr };
      }
      return comment;
    });
    setComments(updatedArray);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div className="">
        {comments.map((comment) => {
          return (
            <CommentElement
              key={comment.id}
              comment={comment}
              handleCommentChange={handleCommentChange}
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

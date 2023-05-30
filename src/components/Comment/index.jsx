import { useState, useEffect } from "react";
import CommentElement from "./CommentElement";
import { getComments } from "../../apis/api";
import { createComment, deleteComment } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

const Comment = ({postId}) => {
  // TODO 1: comments 불러와서 저장해야겟즤
  const [commentList, setCommentList] = useState([]);
  // TODO 2: comment추가하는 input 관리해줘야겟지
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  // const [commentData, setCommentData] = useState("");
  const [newContent, setNewContent] = useState("");

  const editComment = (e) => {
    setNewContent(e.target.value);
    console.log("여기");
    // setCommentData("");
  };
  console.log(newContent);

  useEffect(() => {
    const getCommentsAPI = async () => {
      const comments = await getComments(postId);
      setCommentList(comments);
    }
    getCommentsAPI();

  },[postId]);
  console.log(postId);

  // useEffect(() => {
  //   const deleteCommentAPI = async () => {
  //     const deletecomment = await deleteComment(postId);
  //     setCommentList(deletecomment);
  //   }
  //   deleteCommentAPI();

  // },[onClickDelete]);
  // console.log(postId);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    createComment({ post: postId, content: newContent });
    setNewContent("");
  };

  const handleEditComment = (id, newContent) => {
    setCommentList((prevCommentList) => {
      const updatedList = prevCommentList.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: newContent };
        }
        return comment;
      });
      return updatedList;
    });
  };

  const handleCommentDelete = async (e) => {
    // console.log(commentList);
    // console.log(id);
    // const newCL = commentList.filter((c) => c.id !== id);
    // console.log(newCL);
    // setCommentList(newCL);
    // console.log(comment.id);
    // deleteComment(comment.id);
    
    deleteComment(comment.id);
    
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList && commentList.map((c) => (
        <CommentElement
          comment={c}
          id={c.id}
          content={c.content}
          onEdit={handleEditComment}
          commentList={commentList}
          setCommentList={setCommentList}
          // commentData={commentData}
          // setCommentData={setCommentData}
          handleCommentDelete= {handleCommentDelete}

          //   onClickDelete={onClickDelete}
        />
      ))}
      {/* <form onSubmit={onSubmitClick} class="flex items-center justify-center mt-10 gap-2"> */}
      <form class="flex items-center justify-center mt-10 gap-2">
        {/* // TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
        <input
          required
          //   type="comment"
          type="text"
          //   id="comment"
          className="input"
          onChange={editComment}
          // defaultValue=""
          placeholder="댓글을 입력해주세요"
          // value={commentData}
          value = {newContent}
        />
        <button
          type="submit"
          class="bg-orange-400 text-white font-medium hover:text-black rounded-xl text-lg p-3.5"
          onClick={handleCommentSubmit}
        >
          comment
        </button>
      </form>
    </div>
  );
};

export { Comment };

import { createElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import comment from "../../data/comment";
import CommentElement from "./CommentElement";
import { getComments } from "../../apis/api";
import { createComment } from "../../apis/api";

const Comment = ({ postId }) => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  // const { postId } = useParams();

  const [commentList, setCommentList] = useState([]); // 처음에는 빈 리스트로 설정	
	const [newContent, setNewContent] = useState("");
	
	//추가
	useEffect(() => {
    const getCommentsAPI = async () => {
      const comments = await getComments(postId);
      setCommentList(comments);
    };
    getCommentsAPI();
  }, [postId]);
;

  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");

  useEffect(() => {
    const commentInputValue = formData.content;
    setCommentInputValue(commentInputValue);
  }, [commentInputValue]);

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

  const time = new Date();
  const [created_at, setCreated_at] = useState(time.toJSON());

  const [formData, setFormData] = useState({
    id: comment.length + 1, // 이건 data/comment에 접근을 못해서 제대로 된 index가 나올 수 없을 듯...
    content: "",
    created_at: created_at,
    post: postId, // 사실 여기에는 postId가 들어가는 명세로 되어있어요
    author: { id: 2, username: "user2" },
  });

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    createComment({ post: postId, content: newContent });
    setNewContent("");
  };

  // TODO 4: commet Delete 하는 함수 만들어죠
  // const handleCommentDelete = () => {
  //   // deleteComment(comment.id);
  //   console.log("delete");
  // };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => {
        return (
          <div className="w-full flex flex-row" key={comment.id}>
            <CommentElement
              comment={comment}
              // handleCommentDelete={handleCommentDelete}
            />
          </div>
        );
      })}
      {/* comment form component */}
      <form
        className="flex items-center justify-center mt-10 gap-2"
        onSubmit={handleCommentSubmit}
        // method="patch"
      >
        <input
          type="text"
          value={newContent}
          placeholder="댓글을 입력해주세요"
          className="input h-14"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button type="submit" className="button">
          comment
        </button>
      </form>
    </div>
  );
};

export default Comment;

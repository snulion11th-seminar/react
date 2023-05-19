import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";
import posts from "../../data/posts";

// comment: 댓글창 전체
const Comment = () => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState(comments);

  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [commentData, setCommentData] = useState({
    id: comments.length,
    content: "",
    created_at: "",
    post: posts.id,
    author: { id: comments.length, username: "user2" },
  });

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const handleChange = (e) => {
    console.log(e.target.id);
    setCommentData({ ...commentData, [e.target.id]: e.target.value });
  };

  const makeComment = (e) => {
    e.preventDefault();

    const newComment = {
      id: commentList.length + 1,
      content: commentData.content,
      created_at: new Date().toISOString(),
      post: commentData.post,
      author: commentData.author,
    };

    setCommentList([...commentList, newComment]);

    setCommentData({
      id: commentList.length + 1,
      content: "",
      created_at: "",
      post: posts.id,
      author: { id: comments.length, username: "user2" },
    });
  };

  // TODO 4: commet Delete 하는 함수 만들어죠
  const deleteComment = (commentId) => {
    setCommentList(commentList.filter((t) => t.id !== commentId));
  };

  const updateComment = (commentId, newContent) => {
    const updatedComments = commentList.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    setCommentList(updatedComments);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {/* commentElement댓글 하나 */}
      {/* <CommentElement /> comment마다 반복시켜야즤 */}
      <form className="form" onSubmit={makeComment}>
        <textarea
          placeholder="댓글을 입력해주세요"
          id="content"
          value={commentData.content}
          cols="5"
          rows="2"
          className="input"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="button mt-7">
          Comment
        </button>
      </form>

      <div className="flex flex-col">
        {commentList &&
          commentList.map((comment) => (
            <CommentElement
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;

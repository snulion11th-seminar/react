import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentElement from "../components/CommentElement";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import posts from "../data/posts";
import comments from "../data/comments";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  const [commentList, setCommentList] = useState(comments); // state for comments
  const [newContent, setNewContent] = useState(""); // state for new comment

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setPost(post);
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: commentList.length + 1,
      content: newContent,
      like_users: [],
      author: { id: 1, username: "멋사" }, // 추후 로그인 기능 구현 후 author 수정
      created_at: Date.now(),
    };
    
    // add api call for creating new comment here

    setNewContent("");
    setCommentList([...commentList, newComment]);
  };

  const handleCommentDelete = (targetId) => {
    setCommentList(commentList.filter((comment) => comment.id !== targetId));
  }

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        {/* comment list component */}
        <div className="w-full mt-5 self-start">
          <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
          {commentList.map((comment) => {
            return <CommentElement comment={comment} key={comment.id} />;
          })}
          {/* comment form component */}
          <form
            className="flex items-center justify-center mt-10 gap-2"
            onSubmit={handleCommentSubmit}
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
        <Link to={`/${post.id}/edit`}>
          <button className="button mt-10 py-2 px-10">Edit</button>
        </Link>
      </div>
    )
  );
};

export default PostDetail;

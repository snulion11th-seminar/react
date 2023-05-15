import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Comment } from "../components/comment";
import posts from "../data/posts";
import comments from "../data/comments";

const PostDetailPage = () => {
  // parameter로 받은 id에 해당하는 post를 찾아서 넣자
  // TODO : api call(get post by id)
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    const comment = comments.filter(
      (comment) => comment.post === parseInt(postId)
    );
    setPost(post);
    setComment(comment);
  }, [postId]);

  const onClickDelete = () => {
    console.log("delete");
    // add api call for deleting post here
    // add redirect to home page
  };

  const createComment = (content) => {
    const newComment = {};
    const now = new Date();
    newComment["created_at"] = now.toISOString();
    newComment["content"] = content;
    newComment["id"] = comment.length + 1;
    setComment([...comment, newComment]);
  };

  const deleteComment = (id) => {
    const acc = comment.filter((comment) => comment.id !== id);
    setComment(acc);
  };

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        <Comment
          comments={comment}
          createComment={createComment}
          deleteComment={deleteComment}
        />
        <div>
          <Link to={`/${post.id}/edit`}>
            <button className="button mt-10 mx-4 py-2 px-10">Edit</button>
          </Link>
          <button
            className="button mt-10 mx-4 py-2 px-10"
            onClick={onClickDelete}
          >
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default PostDetailPage;

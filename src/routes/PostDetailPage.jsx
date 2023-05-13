import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import posts from "../data/posts";

const PostDetailPage = () => {
  // parameter로 받은 id에 해당하는 post를 찾아서 넣자
  // TODO : api call(get post by id)
  const { postId } = useParams();
  //라우트에서 변수로 포스트 아이디 받아오는 거
  const [post, setPost] = useState();
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    //useParams 는 텍스트로 들어가서, 인수로 받으려고 parseInt 한다고 함
    //find 는 배열이 아님, filter 는 배열
    setPost(post);
  }, [postId]);

  const onClickDelete = () => {
    console.log("delete");
    // add api call for deleting post here
    // add redirect to home page
  };

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />

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

{
  /*
onClick={onClickDelete}`
onClick={onClickDelete()}`
onClick={()⇒onClickDelete()}`
onClick 안에는 함수가 들어가야 하기 때문에 2번째것은 return 값이라서 실행이 안됨.
*/
}

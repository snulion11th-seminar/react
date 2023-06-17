import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { Comment } from "../components/Comment";
import { deletePost, getPost, getUser } from "../apis/api";
import { getCookie } from "../utils/cookie";

const PostDetailPage = () => {
// parameter로 받은 id에 해당하는 post를 찾아서 넣자
// TODO : api call(get post by id)
  const { postId } = useParams();
  const [post, setPost] = useState();

  const [user, setUser] = useState();

  useEffect(() => {
    // const post = posts.find((post) => post.id === parseInt(postId));
    // setPost(post);
    const getPostAPI=async ()=>{
      setPost(await getPost(postId));
    };
    getPostAPI();
  }, [postId]);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const currentUser = await getUser();
        setUser(currentUser);
        console.log(currentUser);
      };
      getUserAPI();
    }
  }, []);

const onClickDelete = () => {
    // add api call for deleting post here
    // add redirect to home page
    if(window.confirm("정말 삭제?"));
      deletePost(postId);
  };


  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        <Comment postId={postId}/>
        <div>
          {user?.id === post?.author?.id ? (
            <>
              <Link to={`/${post.id}/edit`}>
                <button className="button mt-10 mx-4 py-2 px-10">Edit</button>
              </Link>
              <button
                className="button mt-10 mx-4 py-2 px-10"
                onClick={onClickDelete}
              >
                Delete
              </button>
            </>
          ) : null}
					{/* user와 post.author가 동일하면 버튼을 리턴, 아니면 null */}
        </div>
      </div>
    )
  );
};

export default PostDetailPage;
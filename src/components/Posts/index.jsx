import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../apis/api";
import { getCookie } from "../../utils/cookie";
import { useState } from "react";
import { getLikePost } from "../../apis/api";
import { useParams } from "react-router-dom";

// add api call for liking post

export const SmallPost = ({ post, toggleSearchTagId, searchTagIdList }) => {
  const [user, setUser] = useState();
  const [likeCount, setLikeCount] = useState(post.like_users.length);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  const onClickLike = async () => {
    if (user) {
      try {
        const response = await getLikePost(post.id);
        console.log(
          "🚀 ~ file: index.jsx:30 ~ onClickLike ~ response:",
          response
        );
        if (response) {
          setLiked(response.liked);
          setLikeCount(response.like_users.length);
        } else {
          console.log("[ERROR] Error while liking post");
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  return (
    <div className="w-64 relative block group py-10 px-8 mr-5 my-5 ring-8 ring-transparent border-2 border-box border-white hover:bg-orange-400 hover:text-black hover:border-transparent hover:ring-orange-200 rounded-xl font-medium">
      <h1 className="font-extrabold text-2xl truncate">{post.title}</h1>
      <p className="mt-2">{post.author.username}</p>
      <div className="flex flex-wrap mt-5">
        {post.tags?.map((tag) => {
          const tagClassname = searchTagIdList.includes(tag.id) ? "active" : "";
          return (
            <button
              key={tag.id}
              className={"tag m-1 " + tagClassname}
              onClick={() => {
                toggleSearchTagId(tag.id);
              }}
            >
              #{tag.content}
            </button>
          );
        })}
      </div>
      <div
        className="absolute bottom-3 left-4 cursor-pointer"
        onClick={onClickLike}
      >
        {liked ? "🦁 이미 좋아요를 눌렀어요" : "🦁 좋아요"} {likeCount}
      </div>
      <Link to={`/${post.id}`}>
        <div className="absolute bottom-0 right-0 bg-orange-400 px-5 py-2 rounded-lg translate-x-5 translate-y-5">
          <span className="uppercase">detail</span>
        </div>
      </Link>
    </div>
  );
};

export const BigPost = ({ post }) => {
  const [user, setUser] = useState();
  const [likeCount, setLikeCount] = useState(post?.like_users?.length);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  const onClickLike = async () => {
    if (user) {
      try {
        const response = await getLikePost(post.id);
        console.log(
          "🚀 ~ file: index.jsx:30 ~ onClickLike ~ response:",
          response
        );
        if (response) {
          setLiked(response.liked);
          setLikeCount(response.like_users.length);
        } else {
          console.log("[ERROR] Error while liking post");
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  return (
    <div className="py-5 w-full bg-gray-100 text-black border-0 rounded-md font-medium">
      <div className="px-8">
        <h1 className="font-extrabold text-2xl flex justify-center ">
          {post.title}
        </h1>
        <span className="font-md text-slate-600 flex justify-end">
          작성자 : {post?.author?.username}
        </span>
        <div className="mt-2 h-fill text-xl flex justify-center align-middle">
          {post.content}
        </div>
        <div className="flex mt-5">
          {post.tags &&
            post.tags?.map((tag) => (
              <span key={tag.id} className="tag mr-2">
                #{tag.content}
              </span>
            ))}
        </div>
        <div className="flex mt-5 cursor-pointer" onClick={onClickLike}>
          {liked ? "🦁 이미 좋아요를 눌렀어요" : "🦁 좋아요"} {likeCount}
        </div>
      </div>
    </div>
  );
};

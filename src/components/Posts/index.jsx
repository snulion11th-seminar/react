import { Link } from "react-router-dom";
import { useState } from "react";

export const SmallPost = ({ post }) => {
  const [length, setLength] = useState(post.like_users.length);
  const [liked, setLiked] = useState(false);
  const onClickLike = () => {
    {
      liked ? (
        <div>
          {setLength(length - 1)}
          {setLiked(false)}
        </div>
      ) : (
        <div>
          {setLength(length + 1)}
          {setLiked(true)}
        </div>
      );
    }
    // add api call for liking post here
  };

  return (
    <div className="w-64 relative block group py-10 px-8 mr-5 my-5 ring-8 ring-transparent border-2 border-box border-white hover:bg-orange-400 hover:text-black hover:border-transparent hover:ring-orange-200 rounded-xl font-medium">
      <h1 className="font-extrabold text-2xl truncate">{post.title}</h1>
      <p className="mt-2">{post.author.username}</p>
      <div className="flex flex-wrap mt-5">
        {post.tags.map((tag) => (
          <span key={tag.id} className="tag m-1">
            #{tag.content}
          </span>
        ))}
      </div>
      <div onClick={onClickLike}>
        {post.like_users.length > 0 && <p>❤️ {length}</p>}
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
  const [length, setLength] = useState(post.like_users.length);
  const [liked, setLiked] = useState(false);

  const onClickLike = () => {
    {
      liked ? (
        <div>
          {setLength(length - 1)}
          {setLiked(false)}
        </div>
      ) : (
        <div>
          {setLength(length + 1)}
          {setLiked(true)}
        </div>
      );
    }
    // add api call for liking post here
  };

  return (
    <div className="py-5 w-full bg-orange-400 text-black border-0 ring-8 ring-orange-200 rounded-xl font-medium">
      <div className="px-8">
        <h1 className="font-extrabold text-2xl">{post.title}</h1>
        <span className="mt-2 text-white ">{post.author.username}</span>
        <div className="mt-2 h-28">{post.content}</div>
        <div className="flex mt-5">
          {post.tags &&
            post.tags.map((tag) => (
              <span key={tag.id} className="tag mr-2">
                #{tag.content}
              </span>
            ))}
        </div>
        <div className="flex mt-5" onClick={onClickLike}>
          {post.like_users.length > 0 && <p>❤️ {length}</p>}
        </div>
      </div>
    </div>
  );
};

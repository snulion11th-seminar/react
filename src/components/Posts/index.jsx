import { Link } from "react-router-dom";

export const SmallPost = ({ post }) => {
  return (
    <div className="relative block group py-10 px-8 mr-5 my-5 ring-8 ring-transparent border-2 border-box border-white hover:bg-orange-400 hover:text-black hover:border-transparent hover:ring-orange-200 rounded-xl font-medium">
      <h1 className="font-extrabold text-2xl">{post.title}</h1>
      <p className="mt-2">{post.creator}</p>
      <div className="flex flex-wrap mt-5">
        {post.tags.map((tag) => {
          return (
            <span key={tag} className="tag m-1">
              #{tag}
            </span>
          );
        })}
      </div>
      <Link to={`/${post.id}`}>
        <div className="absolute bottom-0 right-0 bg-orange-400 px-5 py-2 rounded-lg translate-x-5 translate-y-5">
          <span className="uppercase">detail</span>
        </div>
      </Link>
    </div>
  );
};

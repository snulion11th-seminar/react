export const SmallPost = ({ post }) => {
  const onClickLike = () => {
    console.log("나도 좋아!");
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
        {post.like_users.length > 0 && `❤️ ${post.like_users.length}`}
      </div>
    </div>
  );
};

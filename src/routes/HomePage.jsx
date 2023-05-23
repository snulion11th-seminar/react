import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SmallPost } from "../components/Posts";
import { getPosts, getTags } from "../apis/api";
import { getCookie } from "../utils/cookie";

const HomePage = () => {
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();

    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
      setSearchTags(tagContents);
    };
    getTagsAPI();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };

  const handleTagFilter = (e) => {
    const { innerText } = e.target;
    if (searchValue === innerText.substring(1)) {
      setSearchValue("");
    } else {
      const activeTag = innerText.substring(1);
      setSearchValue(activeTag);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="w-full h-72 pb-5 flex justify-center bg-[url('https://www.codelion.net/codelion_thumb.jpg')] bg-center bg-cover">
          <h1 className="uppercase text-6xl text-white">my blog</h1>
        </div>
        <input
          type="text"
          placeholder="Tag Search"
          onChange={handleChange}
          className="border border-orange-400 outline-none rounded-2xl text-center py-2 px-20 text-orange-400 bg-transparent"
        />
        <div className="flex mt-5">
          {searchTags.map((tag) => {
            return (
              <button
                key={tag}
                className={tag === searchValue ? "tag active mr-2" : "tag mr-2"}
                onClick={handleTagFilter}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-4 px-10 mt-10">
        {postList
          .filter((post) =>
            searchValue
              ? post.tags.find((tag) => tag.content === searchValue)
              : post
          )
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>

      {/* 로그인해야지만 Post 버튼 보이도록 설정 */}
      {getCookie("access_token") ? (
        <div className="flex justify-center m-20">
          <Link className="button" to="/create">
            Post
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;

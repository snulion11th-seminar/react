import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { getPosts, getTags } from "../apis/api";
import { getCookie } from "../utils/cookie";

const HomePage = () => {
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    // TODO : api call(get all posts)
    const getPostAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostAPI();

    // TODO : api call(get all tags)
    const getTagAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
      setSearchTags(tagContents);
    };
    getTagAPI();
  }, []);

  // TODO : catch change of input value
  const handleChange = (e) => {
    // console.log(e.target, e)
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };

  // TODO : catch click event of tag button(to filter posts)
  const handleTagFilter = (e) => {
    const { innerText } = e.target;
    if (searchValue === innerText.substring(1)) {
      setSearchValue("");
      return;
    }
    const activeTag = innerText.substring(1);
    setSearchValue(activeTag);
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
          // if input value change, tags will be filtered automatically
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
        {
          // if we click tag button(searchValue will be assigned), only posts with the tag will be shown
          postList
            .filter((post) =>
              searchValue
                ? post.tags.find((tag) => tag.content === searchValue)
                : post
            )
            .map((post) => (
              <SmallPost key={post.id} post={post} />
            ))
        }{" "}
      </div>

      <div className="flex justify-center m-20">
        {getCookie("access_token") ? (
          <Link className="button" to="/create">
            Post
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;

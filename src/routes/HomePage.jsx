import { SmallPost } from "../components/Posts";
import posts from "../data/posts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [postList, setPostList] = useState(posts);
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const tagList = posts.reduce((acc, post) => {
      for (let tag of post.tags) {
        acc.add(tag.content);
      }
      return acc;
    }, new Set());
    setTags([...tagList]);
    setSearchTags([...tagList]);
  }, []);

  const handleChange = (e) => {
    console.log(e.target);
    const { value } = e.target;

    setSearchValue(e.target.value);
    const searchedTag = tags.filter((tag) => tag.includes(e.target.value));
    setSearchTags(searchedTag);
  };
  const handleTagFilter = (e) => {
    const selected_tag = e.target.innerText.slice(1);
    if (searchValue === selected_tag) {
      setPostList(posts);
      setSearchValue("");
    } else {
      const newPostList = posts.filter((post) =>
        post.tags.find((t) => t.content === selected_tag)
      );
      console.log(newPostList);
      setPostList(newPostList);
      setSearchValue(selected_tag);
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
        {postList.map((post) => (
          <SmallPost key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center m-20">
        <Link className="button" to="/create">
          Post
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

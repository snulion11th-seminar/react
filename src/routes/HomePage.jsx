import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [postList, setPostList] = useState(posts);

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
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };

  const handleTagFilter = (e) => {
    const clickedTag = e.target.innerText.slice(1);
    // 이미 선택된 태그를 클릭한 경우: 모든 포스트를 보여줘야 함
    if (searchValue === clickedTag) {
      setSearchValue("");
      setPostList(posts);
    }
    // 새로운 태그를 클릭한 경우: 해당 태그가 포함된 포스트만 보여줘야 함
    else {
      const filteredPosts = posts.filter((post) => {
        for (let i = 0; i < post.tags.length; i++) {
          if (post.tags[i].content === clickedTag) {
            return true;
          }
        }
        return false;
      });
      setSearchValue(clickedTag);
      setPostList(filteredPosts);
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

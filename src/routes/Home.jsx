import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";

const Home = () => {
  const [postList, setPostList] = useState(posts);
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

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
    e.target.classList.toggle("active");
    const selectedTag = e.target.innerText;

    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(selectedTag)) {
        return prevSelectedTags.filter((tag) => tag !== selectedTag);
      } else {
        return [...prevSelectedTags, selectedTag];
      }
    });
  };
  console.log(selectedTags);
  useEffect(() => {
    if (selectedTags.length === 0) {
      setPostList(posts);
    } else {
      const filteredPosts = posts.filter((post) =>
        post.tags.some((tag) => selectedTags.includes("#" + tag.content))
      );
      console.log(filteredPosts);
      setPostList(filteredPosts);
    }
  }, [selectedTags]);

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
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";

const Home = () => {
  const [postList, setPostList] = useState(posts);
  const [tags, setTags] = useState(new Map());
  const [searchTags, setSearchTags] = useState([]);
  const [searchTagId, setSearchTagId] = useState("");

  useEffect(() => {
    const tagList = posts.reduce((acc, post) => {
      for (let tag of post.tags) {
        if (!acc.has(tag.id)) {
          acc.set(tag.id, tag.content);
        } else {
          continue;
        }
      }
      return acc;
    }, new Map());
    setTags(tagList);
    setSearchTags(Array.from(tagList.keys()));
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    // [key, value]
    const newTags = tags.entries().filter((tag) => {
      return tag[1].includes(value);
    });
    setSearchTags(newTags);
  };

  const handleTagFilter = (id) => {
    setSearchTagId(id);
    console.log(id);
  };

  useEffect(() => {
    if (searchTagId === "") {
      setPostList(posts);
    } else {
      const newPostList = posts.filter((post) => {
        return post.tags.some((tag) => tag.id === searchTagId);
      });
      setPostList(newPostList);
    }
  }, [searchTagId]);

  // const handleTagFilter = (e) => {
  //   const { innerText } = e.target;
  //   setSearchValue(innerText.slice(1));
  //   const newPostList = posts.filter((post) => {
  //     return post.tags.some((tag) => tag.content === innerText.slice(1));
  //   });
  //   setPostList(newPostList);
  // };

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
          {searchTags.map((id) => {
            return (
              <button
                key={id}
                className={id === searchTagId ? "tag active mr-2" : "tag mr-2"}
                onClick={() => handleTagFilter(id)}
              >
                #{tags.get(id)}
              </button>
            );
          })}
        </div>
      </div>
      {/* 포스트 맵돌기 */}
      <div className="grid grid-cols-4 px-10 mt-10">
        {postList.map((post) => (
          <SmallPost
            key={post.id}
            post={post}
            setSearchTagId={setSearchTagId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

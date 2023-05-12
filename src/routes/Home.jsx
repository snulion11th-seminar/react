import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";

const Home = () => {
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [postList, setPostList] = useState(posts);
  const [activatedTags, setActivatedTags] = useState([]);

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
    let newValue = e.target.textContent.slice(1);
    let newSearchValues = searchValues;
    ///const { value } = e.target;
    let newactivatedTags = activatedTags;
    let newPostList = [];
    if(newactivatedTags.includes(newValue)){
      newSearchValues = newSearchValues.filter((searchValue) => searchValue !== newValue)
      setSearchValues(newSearchValues);
      newactivatedTags = newactivatedTags.filter((tag) => tag !== newValue);
      if(newactivatedTags.length === 0){
        posts.map((post) => {
          newPostList.push(post);
        })
      }else{
        posts.map((post) => {
          newactivatedTags.map((activatedTag) => {
            if(post.tags.find(tag => tag.content === activatedTag) && !newPostList.includes(post)){
              newPostList.push(post);
          }})
          }
        )
      }
      
    }else{
      newSearchValues.push(newValue)
      setSearchValues(newSearchValues);

      newactivatedTags.push(newValue);
      posts.map((post) => {
        newactivatedTags.map((activatedTag) => {
          if(post.tags.find(tag => tag.content === activatedTag) && !newPostList.includes(post)){
            newPostList.push(post);
        }})
        }
      )
    }
    for(let activatedTag of newactivatedTags){
      console.log(activatedTag);
    }
    setActivatedTags(newactivatedTags);
    setPostList(newPostList);
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
                className={searchValues.includes(tag) ? "tag active mr-2" : "tag mr-2"}
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

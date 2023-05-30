import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { getTags, getPosts } from "../apis/api";
import { getCookie } from "../utils/cookie";
// import axios from "axios";

const HomePage = () => {
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [postList, setPostList] = useState([]);

  // useEffect( () => {
  //   const getPostAPI = async () => {
  //     const response = await axios.get("http://localhost:8000/api/post/");
  //     console.log(response);
  //   }
  //   getPostAPI();
  //   }, []);
  useEffect(() => {
    const getPostAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    }
    getPostAPI();



    //추가
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
      setSearchTags(tagContents);
    };
    getTagsAPI();
		// getTags() 이용해서 tag들 불러오고 tags.map을 이용해서 tagContents에
		// tag.content만 저장한 후, tags와 searchTags에 저장
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };

  const handleTagFilter = (e) => {
    // let tag = e.target.innerText.slice(1);
    // if (searchValue === tag) {
    //   const clickedtag = tags.filter((t) => {
    //     t !== tag;
    //   });
    //   setSearchValue(clickedtag);
    //   // setPostList(posts);
    // } else {
    //   // let tmp = searchValue.push(tag);
    //   setSearchValue(tag);
    //   let clickedpost = posts.filter((post) => {
    //     let include = false;
    //     post.tags.map((t) => {
    //       if (t.content === tag) include = true;
    //       // console.log(t.content);
    //       // console.log(tag);
    //     });
    //     return include;
    //     // console.log(post.tags);
    //   });
    //   // console.log(clickedpost);
    //   setPostList(clickedpost);
    // }
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

      {getCookie("access_token") ? (
        <div className="flex justify-center m-20">
          <Link className="button" to="/create">
            Post
          </Link>
        </div>
      ) : null}

      {/* <div className="flex justify-center m-20">
      <Link className="button" to="/create">
          Post
      </Link>
      </div> */}
    </div>
  );
};

export default HomePage;

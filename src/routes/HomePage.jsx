import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import postsData from "../data/posts";
import { Link } from "react-router-dom";
import { getPosts } from "../apis/api";
import { getTags } from "../apis/api";
import { getCookie } from "../utils/cookie";
// import axios from "axios";

const HomePage = () => {
  //원래는 const [posts, setPosts] = useState(postData); 를 했었는데 아래 빈 어레이..
  const [postList, setPostList] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchTagIdList, setSearchTagIdList] = useState([]);

  //추가

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();

    //추가
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags?.map((tag) => {
        return { id: tag.id, content: tag.content };
      });
      setTags(tagContents);
      setSearchTags(tagContents);
    };
    console.log(getTagsAPI);
    getTagsAPI();
    // getTags() 이용해서 tag들 불러오고 tags?.map을 이용해서 tagContents에
    // tag.content만 저장한 후, tags와 searchTags에 저장
  }, []);

  console.log(tags);

  const handleChange = (e) => {
    const { value } = e.target;
    const newTags = tags.filter((tag) => {
      return tag.content.includes(value);
    });
    setSearchTags(newTags);
    console.log(newTags);
  };

  useEffect(() => {
    if (searchTagIdList.length === 0) {
      setPostList([]);
    } else {
      const newPostList = postList.filter((post) =>
        post.tags.some((tag) => searchTagIdList.includes(tag.id))
      );
      setPostList(newPostList);
    }
  }, [searchTagIdList]);



  const toggleSearchTagId = (id) => {
    if (searchTagIdList.includes(id)) {
      const newSearchTagIdList = searchTagIdList.filter(
        (tagId) => tagId !== id
      );
      setSearchTagIdList(newSearchTagIdList);
    } else {
      setSearchTagIdList([...searchTagIdList, id]);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="w-full h-72 pb-5 flex justify-center bg-[url('https://www.codelion.net/codelion_thumb.jpg')] bg-center bg-cover">
          <h1 className="uppercase text-6xl text-white">my blog</h1>
        </div>

        {/* 태그 서치 */}
        <input
          type="text"
          placeholder="Tag Search"
          onChange={handleChange}
          className="border border-orange-400 outline-none rounded-2xl text-center py-2 px-20 text-orange-400 bg-transparent"
        />
        <div className="flex mt-5">
          {searchTags.map((tag, index) => {
            const searchTagClassname = searchTagIdList.includes(tag.id)
              ? "tag active mr-2"
              : "tag mr-2";
            return (
              <button
                key={index}
                className={searchTagClassname}
                onClick={() => toggleSearchTagId(tag.id)}
              >
                #{tag.content}
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
            searchTagIdList={searchTagIdList}
            toggleSearchTagId={toggleSearchTagId}
          />
        ))}
      </div>

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

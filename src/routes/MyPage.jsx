import { useEffect, useState } from "react";
import { getProfile, getUser } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { updateProfile } from "../apis/api";
import { updateUser } from "../apis/api";
import { SmallPost } from "../components/Posts";
import { getPosts } from "../apis/api";
import { getTags } from "../apis/api";

// import axios from "axios";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchTagIdList, setSearchTagIdList] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    const getProfileAPI = async () => {
      const user = await getProfile(); // 백엔드에서 사용자 데이터 가져오는 비동기 함수
      setUser(user);
    };
    getProfileAPI();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.user.email,
        username: user.user.username,
        college: user.college,
        major: user.major,
      });
    }
  }, [user]);

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (event, field) => {
    event.preventDefault(); // Prevent form submission and page refresh
    try {
      const updatedData = {
        [field]: formData[field],
      };
      (await (field === "email" || field === "username"))
        ? updateUser(updatedData)
        : updateProfile(updatedData);

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      }));
      window.location.reload();
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-1/2">
        <h3 className=" font-bold text-4xl">My Page</h3>
        <form className="form">
          <label htmlFor="email" className="label">
            *email:
          </label>
          <div className="flex flex-row w-full">
            <input
              required
              type="email"
              id="email"
              className="input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <button
              className="button selection:mr-3"
              onClick={(e) => handleSubmit(e, "email")}
            >
              🖋️
            </button>
          </div>

          <label required htmlFor="username" className="label">
            *이름:
          </label>
          <div className="flex flex-row w-full">
            <input
              required
              type="text"
              id="username"
              className="input"
              value={formData.username}
              onChange={handleInputChange}
            />
            <button
              className="button selection:mr-3"
              onClick={(e) => handleSubmit(e, "username")}
            >
              🖋️
            </button>
          </div>

          <label htmlFor="college" className="label">
            대학:{" "}
          </label>
          <div className="flex flex-row w-full">
            <input
              type="text"
              id="college"
              className="input"
              value={formData.college}
              onChange={handleInputChange}
            />
            <button
              className="button selection:mr-3"
              onClick={(e) => handleSubmit(e, "college")}
            >
              🖋️
            </button>
          </div>
          <label htmlFor="major" className="label">
            전공:{" "}
          </label>
          <div className="flex flex-row w-full">
            <input
              type="text"
              id="major"
              className="input"
              value={formData.major}
              onChange={handleInputChange}
            />
            <button
              className="button selection:mr-3"
              onClick={(e) => handleSubmit(e, "major")}
            >
              🖋️
            </button>
          </div>
        </form>
      </div>
      <div>
        <h3 className=" mt-8 font-bold text-4xl">My Post</h3>
      </div>
      <div className="grid grid-cols-2 px-10 mt-10">
        {postList.map(
          (post) =>
            user?.id === post.author.id && ( // Remove curly braces around the condition
              <SmallPost
                key={post.id}
                post={post}
                searchTagIdList={searchTagIdList}
                toggleSearchTagId={toggleSearchTagId}
              />
            )
        )}
      </div>
    </>
  );
};

export default MyPage;

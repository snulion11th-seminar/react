import { useState, useEffect } from "react";
import { getInfo, updateInfo, getPosts, getTags } from "../apis/api";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const [originalData, setOriginalData] = useState({});

  const [isEdit, setIsEdit] = useState({
    email: false,
    username: false,
    college: false,
    major: false,
  });

  const [postList, setPostList] = useState([]);
  const [id, setId] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getPostAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostAPI();

    //추가
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
    };
    getTagsAPI();
    // getTags() 이용해서 tag들 불러오고 tags.map을 이용해서 tagContents에
    // tag.content만 저장한 후, tags와 searchTags에 저장
  }, []);

  useEffect(() => {
    const getProfileAPI = async () => {
      const profile = await getInfo();
      console.log(profile);
      setFormData({
        email: profile.user.email,
        username: profile.user.username,
        college: profile.college,
        major: profile.major,
      });
      setOriginalData({
        email: profile.user.email,
        username: profile.user.username,
        college: profile.college,
        major: profile.major,
      });
      setId(profile.user.id);
    };
    getProfileAPI();
  }, []);

  const handleEditInfo = () => {
    updateInfo(formData);
  };

  const handleCancelEdit = (field) => {
    setFormData({ ...formData, [field]: originalData[field] });
    setIsEdit({ ...isEdit, [field]: false });
  };

  console.log(postList);
  console.log(id);
  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl pb-6">My Info</h3>

      <div class="flex justify-start w-full">email:</div>
      {isEdit.email ? (
        <>
          <input
            className="input mr-4"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <span>
            <button className="button mr-4" onClick={handleEditInfo}>
              변경하기
            </button>

            <button
              className="button"
              onClick={() => {
                handleCancelEdit("email");
              }}
            >
              취소하기
            </button>
          </span>
        </>
      ) : (
        <>
          <div className="w-full flex flex-row items-center">
            
              <p className="textDesign font-bold">{formData.email}</p>
            
            <button
              className="button flex-shrink-0 ml-2"
              onClick={() => setIsEdit({ ...isEdit, email: true })}
            >
              변경
            </button>
            {/* </div> */}
          </div>
        </>
      )}

      {/* </div> */}
      <div class="flex justify-start w-full">username:</div>

      {isEdit.username ? (
        <>
          <input
            className="input"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <span>
            <button className="button mr-4" onClick={handleEditInfo}>
              변경하기
            </button>

            <button
              className="button"
              onClick={() => {
                handleCancelEdit("username");
              }}
            >
              취소하기
            </button>
          </span>
        </>
      ) : (
        <>
          <div className="w-full flex flex-row items-center">
            <p className="textDesign font-bold">{formData.username}</p>
            <button
              className="button flex-shrink-0 ml-2"
              onClick={() => setIsEdit({ ...isEdit, username: true })}
            >
              변경
            </button>
          </div>
        </>
      )}

      <div class="flex justify-start w-full">college:</div>
      {isEdit.college ? (
        <>
          <input
            className="input mr-4"
            value={formData.college}
            onChange={(e) =>
            setFormData({ ...formData, college: e.target.value })
            }
          />
          <span>
            <button className="button mr-4" onClick={handleEditInfo}>
              변경하기
            </button>

            <button
              className="button"
              onClick={() => {
                handleCancelEdit("college");
              }}
            >
              취소하기
            </button>
          </span>
        </>
      ) : (
        <>
          <div className="w-full flex flex-row items-center">
            <p className="textDesign font-bold">{formData.college}</p>
            <button
              className="button flex-shrink-0 ml-2"
              onClick={() => setIsEdit({ ...isEdit, college: true })}
            >
              변경
            </button>
          </div>
        </>
      )}

      <div class="flex justify-start w-full">major:</div>
      {isEdit.major ? (
        <>
          <input
            className="input mr-4"
            value={formData.major}
            onChange={(e) =>
              setFormData({ ...formData, major: e.target.value })
            }
          />
          <span>
            <button className="button mr-4" onClick={handleEditInfo}>
              변경하기
            </button>

            <button
              className="button"
              onClick={() => {
                handleCancelEdit("major");
              }}
            >
              취소하기
            </button>
          </span>
        </>
      ) : (
        <>
          <div className="w-full flex flex-row items-center">
            <p className="textDesign font-bold">{formData.major}</p>
            <button
              className="button flex-shrink-0 ml-2"
              onClick={() => setIsEdit({ ...isEdit, major: true })}
            >
              변경
            </button>
          </div>
        </>
      )}
      {/* </div> */}

      <h3 className=" font-bold text-4xl pt-6">My Posts</h3>
      <div className="grid grid-cols-4 px-10 mt-10">
        {postList
          .filter((post) => post.author.id === id)
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default MyPage;

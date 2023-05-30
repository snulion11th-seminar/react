import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import { getCookie } from "../utils/cookie";
import {
  getUserProfile,
  updateInformation,
  getPosts,
  getUser,
} from "../apis/api";
const MyPage = () => {
  const [user, setUser] = useState("");
  const [userprofile, setUserProfile] = useState({});
  const [postList, setPostList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    major: "",
    college: "",
  });
  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);
  useEffect(() => {
    const getUserAPI = async () => {
      const user = await getUser();
      setUser(user);
    };
    getUserAPI();
  }, []);
  useEffect(() => {
    const getUserProfileAPI = async () => {
      const userprofile = await getUserProfile();
      setUserProfile(userprofile);
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: user.username,
        email: userprofile.user.email,
        major: userprofile.major,
        college: userprofile.college,
      }));
    };
    getUserProfileAPI();
    console.log(userprofile);
  }, [user]);

  const handleEditInformation = (e) => {
    updateInformation(formData);

    console.log(userprofile);
  };
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl font-bold">My Info</h1>
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="w-3/4">
            {isEdit ? (
              <input
                className="input mr-4"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    username: e.target.value,
                  }))
                }
              />
            ) : (
              <>
                <span>*username:</span>
                <p className=" mr-4 text-2xl font-bold margin-top mt-1  ">
                  {formData.username}
                </p>
              </>
            )}
          </div>
          <div className="w-1/4 flex flex-row-reverse items-center">
            {isEdit ? (
              <>
                <button className="mr-3" onClick={handleEditInformation}>
                  Done
                </button>
                <button
                  className="mr-3"
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      username: user.username,
                    }));
                  }}
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <button className="button" onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <hr className="border-1 border-gray-400 w-full mb-5" />
        </div>
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="w-3/4">
            {isEdit ? (
              <input
                className="input mr-4"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: e.target.value,
                  }))
                }
              />
            ) : (
              <>
                <span>*email:</span>
                <p className=" mr-4 text-2xl font-bold">{formData.email}</p>
              </>
            )}
          </div>
          <div className="w-1/4 flex flex-row-reverse items-center">
            {isEdit ? (
              <>
                <button className="mr-3" onClick={handleEditInformation}>
                  Done
                </button>
                <button
                  className="mr-3"
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      email: userprofile.user.email,
                    }));
                  }}
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <button className="button" onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <hr className="border-1 border-gray-400 w-full mb-5" />
        </div>
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="w-3/4">
            {isEdit ? (
              <input
                className="input mr-4"
                value={formData.college}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    college: e.target.value,
                  }))
                }
              />
            ) : (
              <>
                <span>*college:</span>
                <p className=" mr-4 text-2xl font-bold">{formData.college}</p>
              </>
            )}
          </div>
          <div className="w-1/4 flex flex-row-reverse items-center">
            {isEdit ? (
              <>
                <button className="mr-3" onClick={handleEditInformation}>
                  Done
                </button>
                <button
                  className="mr-3"
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      college: userprofile.college,
                    }));
                  }}
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <button className="button" onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <hr className="border-1 border-gray-400 w-full mb-5" />
        </div>
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="w-3/4">
            {isEdit ? (
              <input
                className="input mr-4"
                value={formData.major}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    major: e.target.value,
                  }))
                }
              />
            ) : (
              <>
                <span>*major:</span>
                <p className=" mr-4 text-2xl font-bold">{formData.major}</p>
              </>
            )}
          </div>
          <div className="w-1/4 flex flex-row-reverse items-center">
            {isEdit ? (
              <>
                <button className="mr-3" onClick={handleEditInformation}>
                  Done
                </button>
                <button
                  className="mr-3"
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      major: userprofile.major,
                    }));
                  }}
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <button className="button" onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <hr className="border-1 border-gray-400 w-full mb-5" />
        </div>
        <h1 className="text-center text-4xl font-bold">My Posts</h1>
        <div className="grid grid-cols-4 px-10 mt-10">
          {postList
            .filter((post) => user?.id === post?.author.id)
            .map((post) => (
              <SmallPost key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default MyPage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SmallPost } from "../components/Posts";
import {
  getPosts,
  getTags,
  getUserInMyPage,
  updateUserInMyPage,
} from "../apis/api";
import { getCookie } from "../utils/cookie";

const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [profile, setProfile] = useState({
    id: "",
    user: {},
    college: "",
    major: "",
  });
  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [isEditCollege, setIsEditCollege] = useState(false);
  const [isEditMajor, setIsEditMajor] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    const getProfileAPI = async () => {
      const myProfile = await getUserInMyPage();
      console.log(myProfile);
      setProfile({
        id: myProfile.id,
        user: myProfile.user,
        college: myProfile.college,
        major: myProfile.major,
      });
      setUser(myProfile.user);
    };
    getProfileAPI();
  }, []);

  useEffect(() => {
    setEmail(profile.user.email);
    setUsername(profile.user.username);
    setCollege(profile.college);
    setMajor(profile.major);
  }, [profile]);

  const handleBackEmail = () => {
    setEmail(profile.user.email);
    console.log(profile.email);
    setIsEditEmail(!isEditEmail);
  };
  const handleBackUsername = () => {
    setUsername(profile.user.username);
    setIsEditUsername(!isEditUsername);
  };
  const handleBackCollege = () => {
    setCollege(profile.college);
    setIsEditCollege(!isEditCollege);
  };
  const handleBackMajor = () => {
    setMajor(profile.major);
    setIsEditMajor(!isEditMajor);
  };

  const handleEditEmail = (e) => {
    e.preventDefault();
    setIsEditEmail(!isEditEmail);
    const newProfile = {
      id: profile.id,
      user: { ...profile.user, email: email },
      college: profile.college,
      major: profile.major,
    };
    console.log(newProfile.user.email);
    setProfile(newProfile);
    updateUserInMyPage(newProfile);
  };
  const handleEditUsername = (e) => {
    e.preventDefault();
    setIsEditUsername(!isEditUsername);
    const newProfile = {
      id: profile.id,
      user: { ...profile.user, username: username },
      college: profile.college,
      major: profile.major,
    };
    setProfile(newProfile);
    updateUserInMyPage(newProfile);
  };
  const handleEditCollege = () => {
    setIsEditCollege(!isEditCollege);
    const newProfile = {
      id: profile.id,
      user: profile.user,
      college: college,
      major: profile.major,
    };
    setProfile(newProfile);
    updateUserInMyPage(newProfile);
  };
  const handleEditMajor = () => {
    setIsEditMajor(!isEditMajor);
    const newProfile = {
      id: profile.id,
      user: profile.user,
      college: profile.college,
      major: major,
    };
    setProfile(newProfile);
    updateUserInMyPage(newProfile);
  };

  return (
    <div className="w-3/5 flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center mb-5">
        <div>
          <h1 className="uppercase text-6xl text-white">My Info</h1>
        </div>
      </div>

      <div className="w-full flex justify-center flex-row">
        {isEditEmail ? (
          <div className="w-3/4">
            <div>Email</div>
            <input
              className="input mr-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="button mt-7" onClick={handleBackEmail}>
                취소하기
              </button>
              <button className="button mt-7" onClick={handleEditEmail}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="w-3/4">
            <div>Email</div>
            <div className="flex w-full justify-between items-center">
              <div className="text-lg statusbox mr-4">{email}</div>
              <button
                className="flex button"
                onClick={() => {
                  setIsEditEmail(!isEditEmail);
                }}
              >
                변경
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center flex-row">
        {isEditUsername ? (
          <div className="w-3/4">
            <div>Username</div>
            <input
              className="input mr-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="button mt-7" onClick={handleBackUsername}>
                취소하기
              </button>
              <button className="button mt-7" onClick={handleEditUsername}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="w-3/4">
            <div>Username</div>
            <div className="flex justify-between items-center">
              <p className="text-lg statusbox mr-4">{username}</p>
              <button
                className="button"
                onClick={() => {
                  setIsEditUsername(!isEditUsername);
                }}
              >
                변경
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center flex-row">
        {isEditCollege ? (
          <div className="w-3/4">
            <div>College</div>
            <input
              className="input mr-4"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="button mt-7" onClick={handleBackCollege}>
                취소하기
              </button>
              <button className="button mt-7" onClick={handleEditCollege}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="w-3/4">
            <div>College</div>
            <div className="flex justify-between items-center">
              <p className="text-lg statusbox mr-4">{college}</p>
              <button
                className="button"
                onClick={() => {
                  setIsEditCollege(!isEditCollege);
                }}
              >
                변경
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center flex-row">
        {isEditMajor ? (
          <div className="w-3/4">
            <div>major</div>
            <input
              className="input mr-4"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="button mt-7" onClick={handleBackMajor}>
                취소하기
              </button>
              <button className="button mt-7" onClick={handleEditMajor}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="w-3/4">
            <div>major</div>
            <div className="flex justify-between items-center">
              <p className="text-lg statusbox mr-4">{major}</p>
              <button
                className="button"
                onClick={() => {
                  setIsEditMajor(!isEditMajor);
                }}
              >
                변경
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 mt-10 gap-x-8 gap-y-4">
        {postList
          .filter(
            (post) =>
              JSON.stringify(post.author.id) === JSON.stringify(profile.user.id)
          )
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default MyPage;

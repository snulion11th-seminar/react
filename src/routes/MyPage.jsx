import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
// import { Link } from "react-router-dom";
import { MyInfo } from "../apis/api";
import { MyInfoForm } from "../components/Form";
import { getMyPage } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { getPosts } from "../apis/api";

const MyInfoPage = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getMyPage();
        console.log("user : ", user);
        setUser(user);
        if (user) {
          setFormData({
            email: user.user.email,
            username: user.user.username,
            college: user.college,
            major: user.major,
          });
          console.log(user, "hihi2");
        }
      };
      getUserAPI();
    }
  }, []);

  // useEffect(() => {
  //   // access_token이 있으면 유저 정보 가져옴
  //   if (getCookie("access_token")) {
  //     const getUserAPI = async () => {
  //       const user = await getUser();
  //       console.log(user);
  //       setUser(user);
  //     };
  //     getUserAPI();
  //   }
  // }, []);

  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">My Info</h3>
      {/* <MyInfoForm
        formData={formData}
        setFormData={setFormData}
        handleMyInfoSubmit={handleMyInfoSubmit}
      /> */}

      <>
        <MyInfoForm
          formData={formData}
          setFormData={setFormData}
        />
      </>

      {/* <div className="w-1/4 flex flex-row-reverse items-center">
              {isSubmitted ? (
                <>
                  <button onClick={handleMyInfoSubmit}>Done</button>

                  <button
                    className="mr-3"
                    onClick={() => {
                      setIsSubmitted(!isSubmitted);
                      setMyInfoInput(user.email);
                    }}
                  >
                    Back
                  </button>
                </>
              ) : (
                  <button
                    className="mr-3"
                    onClick={() => setIsSubmitted(!isSubmitted)}
                  >
                    Edit
                  </button>
              )}
            </div> */}
      <div className="grid grid-cols-4 px-10 mt-10">
        {postList
          .filter((post) => post.author === user.username)
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default MyInfoPage;

{
  /* <>
          <p className="text-lg ">{formData.email}</p>
          <input style={{ margin: "10px 0" }} />
          <input style={{ margin: "10px 0" }} />
          <input style={{ margin: "10px 0" }} />
          <input style={{ margin: "10px 0" }} />
        </> */
}

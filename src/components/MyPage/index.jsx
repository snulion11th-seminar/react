import { SmallPost } from "../Posts";
import MyPageElement from "./MyPageElement";

export const MyPageForm = ({ formData, setFormData }) => {
  return (
    <>
      <MyPageElement
        type="email"
        formData={formData}
        setFormData={setFormData}
      />
      <MyPageElement
        type="username"
        formData={formData}
        setFormData={setFormData}
      />
      <MyPageElement
        type="college"
        formData={formData}
        setFormData={setFormData}
      />
      <MyPageElement
        type="major"
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export const MyPost = ({ myPosts }) => {
  if (!myPosts) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 mt-10">
      {myPosts.map((posts) => (
        <SmallPost key={posts.id} post={posts} />
      ))}
    </div>
  );
};

import { useState, useEffect } from "react";
import { editProfile, getUser } from "../apis/api";
import { ProfileEditForm } from "../components/Form";

const MyPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editProfile(formData);
  };

  useEffect(() => {
    const getUserAPI = async () => {
      const user = await getUser();
      console.log(user);
      const userFormData = {
        ...user,
        email: user.user.email,
        username: user.user.username,
        college: user.college,
        major: user.major,
      };
      setFormData(userFormData);
    };
    getUserAPI();
  }, []);

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">My Info</h3>
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        handleEditSubmit={handleEditSubmit}
        datainfo={"email"}
        datatype={"email"}
      />
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        handleEditSubmit={handleEditSubmit}
        datainfo={"username"}
        datatype={"text"}
      />
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        handleEditSubmit={handleEditSubmit}
        datainfo={"college"}
        datatype={"text"}
      />
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        handleEditSubmit={handleEditSubmit}
        datainfo={"major"}
        datatype={"text"}
      />
    </div>
  );
};

export default MyPage;

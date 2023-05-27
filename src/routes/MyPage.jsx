import { useState, useEffect } from "react";
import { getUser } from "../apis/api";
import { ProfileEditForm } from "../components/Form";

const MyPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  useEffect(() => {
    const getUserAPI = async () => {
      const user = await getUser();
      // console.log(user);
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
  }, [refresh]);

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">My Info</h3>
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        refresh={refresh}
        setRefresh={setRefresh}
        datainfo={"email"}
        datatype={"email"}
      />
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        refresh={refresh}
        setRefresh={setRefresh}
        datainfo={"username"}
        datatype={"text"}
      />
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        refresh={refresh}
        setRefresh={setRefresh}
        datainfo={"college"}
        datatype={"text"}
      />
      <ProfileEditForm
        formData={formData}
        setFormData={setFormData}
        refresh={refresh}
        setRefresh={setRefresh}
        datainfo={"major"}
        datatype={"text"}
      />
    </div>
  );
};

export default MyPage;

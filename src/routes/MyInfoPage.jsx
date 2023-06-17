import { useEffect, useState } from "react";
import { EditableInputField } from "../components/ItemEdit";
import { getUserProfile, updateUserProfile } from "../apis/api";

const MyInfoPage = () => {
  const [userProfile, setUserProfile] = useState();
  const validUser = userProfile?.user;
  useEffect(() => {
    const getUserFromAPI = async () => {
      const gotUserProfile = await getUserProfile();
      setUserProfile(gotUserProfile);
      // console.log(gotUserProfile);   
    }
    getUserFromAPI();
  },[]);
  
  const handleEdited = (e) => {
    e.preventDefault();
    console.log(userProfile);
    updateUserProfile(userProfile);
  };


  return (
    validUser &&
    <div className="flex flex-col items-center w-1/2">
      <h1 className="text-gray-100 font-semibold text-xl">My Info</h1>
      <EditableInputField
        label="email"
        content={userProfile.user.email}
        setContent={(c)=>{setUserProfile({...userProfile, user:{...userProfile.user, email:c}})}}
        handleEdited={handleEdited}
      />
      <EditableInputField
        label={"User Name"}
        content={userProfile.user.username}
        setContent={(c)=>{setUserProfile({...userProfile, user:{...userProfile.user, username:c}})}}
        handleEdited={handleEdited}
      />
    <EditableInputField
        label={"College"}
        content={userProfile.college}
        setContent={(c)=>{setUserProfile({...userProfile, college: c})}}
        handleEdited={handleEdited}
      />
    <EditableInputField
        label={"Major"}
        content={userProfile.major}
        setContent={(c)=>{setUserProfile({...userProfile, major: c})}}
        handleEdited={handleEdited}
      />
    </div>
  );
};

export default MyInfoPage;
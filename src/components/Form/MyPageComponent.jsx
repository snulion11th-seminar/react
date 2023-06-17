import { useEffect, useState } from "react";
import { updateUserProfile } from "../../apis/api";
import _ from "lodash";

export const MyPageComponent = ({ dataInfo, userProfileInfo }) => {
  // edit 버튼 눌렀는지 여부
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserProfileInfo, setTempUserProfileInfo] =
    useState(userProfileInfo);

  const handleInput = (e) => {
    const { id, value } = e.target;
    // emai, username input 변경
    if (id === "email" || id === "username") {
      setTempUserProfileInfo({
        ...userProfileInfo,
        user: {
          ...userProfileInfo.user,
          [id]: value,
        },
      });
    }
    // college, major input 변경
    if (id === "college" || id === "major") {
      setTempUserProfileInfo({
        ...userProfileInfo,
        [id]: value,
      });
    }
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setTempUserProfileInfo(userProfileInfo);
  };

  // 변경사항을 submit하면 실행되는 함수
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUserProfileInfo = tempUserProfileInfo;
    // user가 변경되지 않았으면 user를 빼고 update (user 변경 없이 patch 요청 보내면 400 에러 발생)
    if (_.isEqual(userProfileInfo.user, tempUserProfileInfo.user)) {
      console.log("user 빠짐");
      delete updatedUserProfileInfo.user;
    } else {
      console.log("user 안빠짐");
    }
    console.log(updatedUserProfileInfo, "update 날리기 직전 userProfileInfo");
    updateUserProfile(updatedUserProfileInfo);
  };

  return (
    <div>
      {isEditing ? (
        <form className="form" onSubmit={handleUpdate}>
          <label className="label">{dataInfo}</label>
          <input
            required
            className="input"
            id={dataInfo}
            value={
              dataInfo === "email" || dataInfo === "username"
                ? tempUserProfileInfo.user[dataInfo]
                : tempUserProfileInfo[dataInfo]
            }
            onChange={handleInput}
          />
          <button type="submit">done</button>
          <button onClick={handleBack}>back</button>
        </form>
      ) : (
        <div>
          <div className="label">{dataInfo}</div>
          <div className="input">
            {dataInfo === "email" || dataInfo === "username"
              ? tempUserProfileInfo.user[dataInfo]
              : tempUserProfileInfo[dataInfo]}
          </div>
          <button onClick={handleIsEditing}>Edit</button>
        </div>
      )}
    </div>
  );
};

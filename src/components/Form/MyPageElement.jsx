import { useState } from "react";
import { updateUserInMyPage } from "../../apis/api";


const MyPageElement = ({profile, formData, setFormData, setProfile, title}) => {

  const [isEdit, setIsEdit] = useState(false);
  const handleFormData = (e) => {
    e.preventDefault();
    const {id, value} = e.target;
    setFormData({
      ...formData, [id]: value
    });
  };
  const handleBackFormData = () => {
    setFormData(profile);
    setIsEdit(!isEdit);
  };
  const handleSubmitFormData = (e) => {
    setIsEdit(!isEdit);
    e.preventDefault();
    const newProfile = {
      id: profile.id,
      user: { ...profile.user, email: formData.email, username: formData.username},
      college: formData.college,
      major: formData.major,
    };
    setProfile(newProfile);
    updateUserInMyPage(newProfile);
  }
  return(
    <div className="w-full flex justify-center flex-row">
        {isEdit ? (
          <div className="w-3/4">
            <div>{title}</div>
            <input
              className="input mr-4"
              id={title}
              type={title}
              value={formData[title]}
              onChange={handleFormData}
            />
            <div className="flex justify-center">
              <button className="button mt-7" onClick={handleBackFormData}>
                취소하기
              </button>
              <button className="button mt-7" onClick={handleSubmitFormData}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="w-3/4">
            <div>{title}</div>
            <div className="flex w-full justify-between items-center">
              <div className="text-lg statusbox mr-4">{formData[title]}</div>
              <button
                className="flex button"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              >
                변경
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default MyPageElement;
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateMyInfo } from "../../apis/api";

export const MyPageInput = ({ content }) => {
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const [isCollegeEdit, setIsCollegeEdit] = useState(false);
  const [isMajorEdit, setIsMajorEdit] = useState(false);
  const [formData, setFormData] = useState(content);

  const handleChange = (e) => {

    if (e.target.id === "email" || e.target.id === "username")
      {
        setFormData({ ...formData, [`user`]: {...formData.user, [e.target.id]: e.target.value} });
      }
    else setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateMyInfo(formData);
    setIsEmailEdit(false);
    setIsUsernameEdit(false);
    setIsCollegeEdit(false);
    setIsMajorEdit(false);
  };

  const onEmailEditClick = async (e) => {
    setIsEmailEdit(true);
  };

  const onUsernameEditClick = async (e) => {
    setIsUsernameEdit(true);
  };

  const onCollegeEditClick = async (e) => {
    setIsCollegeEdit(true);
  };

  const onMajorEditClick = async (e) => {
    setIsMajorEdit(true);
  };


  const onCancelClick = async (e) => {
    setFormData(content);
  };

  return (
    <>
      {formData && (
        <form className="form" onSubmit={onSubmit}>
          <div className="flex  w-full gap-x-5">
            <input
              type="text"
              placeholder="Add Tags.."
              id="email"
              value={formData.user.email}
              className="input grow"
              onChange={handleChange}
            />
            <>
            {isEmailEdit ? (
              <div>
                <button className="small-button w-16">submit</button>
                <button className="small-button w-16" onClick={onCancelClick}>cancel</button>
              </div>
            ) : (
              <button className="small-button w-16" onClick={onEmailEditClick}>edit</button>
            )}
          </>
          </div>
          <div className="flex  w-full gap-x-5">
            <input
              type="text"
              placeholder="Add Tags.."
              id="username"
              value={formData.user.username}
              className="input grow"
              onChange={handleChange}
            />
            <>
            {isUsernameEdit ? (
              <div>
                <button className="small-button w-16">submit</button>
                <button className="small-button w-16" onClick={onCancelClick}>cancel</button>
              </div>
            ) : (
              <button className="small-button w-16" onClick={onUsernameEditClick}>edit</button>
            )}
          </>
          </div>
          <div className="flex  w-full gap-x-5">
            <input
              type="text"
              placeholder="Add Tags.."
              id="college"
              value={formData.college}
              className="input grow"
              onChange={handleChange}
            />
            <>
            {isCollegeEdit ? (
              <div>
                <button className="small-button w-16">submit</button>
                <button className="small-button w-16" onClick={onCancelClick}>cancel</button>
              </div>
            ) : (
              <button className="small-button w-16" onClick={onCollegeEditClick}>edit</button>
            )}
          </>
          </div>
          <div className="flex  w-full gap-x-5">
            <input
              type="text"
              placeholder="Add Tags.."
              id="major"
              value={formData.major}
              className="input grow"
              onChange={handleChange}
            />
            <>
            {isMajorEdit ? (
              <div>
                <button className="small-button w-16">submit</button>
                <button className="small-button w-16" onClick={onCancelClick}>cancel</button>
              </div>
            ) : (
              <button className="small-button w-16" onClick={onMajorEditClick}>edit</button>
            )}
          </>
          </div>
        </form>
      )}
    </>
  );
};

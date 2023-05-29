import { useState, useEffect } from "react";
import { updateUserInfo } from "../../apis/api";

const MyPageElement = ({ formData, setFormData, type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const [originalData, setOriginalData] = useState({
    [type]: formData[type],
  });

  useEffect(() => {
    const getOriginalData = () => {
      setOriginalData({
        ...originalData,
        [type]: formData[type],
      });
    };
    getOriginalData();
  }, [isEdit]);

  const handleEdit = (e) => {
    e.preventDefault();
    const id = e.target.id;
    setIsEdit(true);
    setEditingField(id);
    setFormData({ ...formData, [id]: formData[id] });
  };

  const handleEditCancel = (e) => {
    e.preventDefault();
    console.log("hihi");
    setIsEdit(false);
    setEditingField(null);
    setFormData({ ...formData, [type]: originalData[type] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEdit(false);
    const response = await updateUserInfo(formData);
    window.location.reload();
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <>
      <label htmlFor={type} className="label">
        {type}:
      </label>
      {isEdit && editingField === type ? (
        <div className="flex flex-row items-center w-full">
          <input
            type={type}
            id={type}
            className="input"
            onChange={handleFormData}
            value={formData[type]}
            disabled={false}
          />
          <div className="flex flex-row items-center">
            <button id={type} onClick={handleEditCancel} className="mid-button">
              취소하기
            </button>
            <button onClick={handleSubmit} className="mid-button">
              수정하기
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center w-full">
          <input
            type={type}
            id={type}
            className="input"
            value={formData[type]}
            disabled={true}
          />
          <button id={type} onClick={handleEdit} className="mid-button">
            변경
          </button>
        </div>
      )}
    </>
  );
};

export default MyPageElement;

import React, { useState } from "react";
import { editUser } from "../../apis/api";

// MyPage에 있는 input 하나하나를 관리하는 컴포넌트
// type: input의 종류 (email, username 등) propValue: 그에 해당하는 user정보값
const MyPageForm = ({ type, propValue }) => {
  //사용자가 편집중인 상태인지를 관리하는 state(편집중일때와 아닐 때 다른 스타일의 input을 보여주기 위함)
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(propValue);

  // '취소하기' 버튼을 누르면 isEditing을 다시 false로 바꾸고 input 값을 다시 변경 시도 이전으로 초기화시킴
  const handleCancel = () => {
    setIsEditing(false);
    setInputValue(propValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //type: 입력한 값 (ex.username: testuser01)의 형식으로 데이터가 전송됨
    const data = {
      [type]: inputValue,
    };

    // form 제출시 data를 담아서 api 요청을 보냄
    try {
      await editUser(data);
    } catch (error) {
      console.log("[ERROR] error while editing user", error);
    }
  };

  return (
    <form className="flex w-5/12 flex-col pb-6">
      <label className="pb-1">{type}:</label>
      {isEditing ? (
        <div className="flex flex-col items-center mt-1">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="bg-transparent pl-6 border-2 border-white rounded-lg h-12 w-full"
          />
          <div className="flex flex-row justify-between w-1/3 mt-5">
            <button
              onClick={handleCancel}
              className="bg-orange-400 rounded-xl h-11 w-20"
            >
              취소하기
            </button>
            <button
              onClick={handleSubmit}
              className="bg-orange-400 rounded-xl h-11 w-20"
            >
              수정하기
            </button>
          </div>
        </div>
      ) : (
        <div className="border-b border-white flex justify-between h-12">
          <input
            className="bg-black font-bold pb-3 pl-3 outline-none w-full"
            value={inputValue}
            readOnly
          />
          <button
            className="bg-orange-400 w-12 rounded-lg h-5/6"
            onClick={() => setIsEditing(true)}
          >
            변경
          </button>
        </div>
      )}
    </form>
  );
};

export default MyPageForm;

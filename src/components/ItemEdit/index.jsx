import { useState } from "react";

export const EditableInputField = ({
  content,
  setContent,
  handleEdited,
  label,
  placeholder,
}) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="w-full">
      {label && <label className="text-gray-300 text-sm">{label}</label>}
      <div className="w-full flex justify-between gap-1 mb-2">
        <input
          type="text"
          className="border border-orange-500 rounded-md w-full px-2 py-1 text-white bg-transparent disabled:border-gray-300"
          value={content}
          placeholder={placeholder}
          onChange={(e) => setContent(e.target.value)}
          disabled={!edit}
        />
      {!edit ? (
        <span>
          <button
            className="text-gray-500 text-sm m-1 whitespace-nowrap hover:text-gray-100"
            onClick={() => setEdit(!edit)}
          >
            수정
          </button>
        </span>
      ) : (
        <span className="flex justify-end">
          <button
            className="text-gray-500 text-sm m-1  whitespace-nowrap hover:text-gray-100"
            onClick={() => setEdit(!edit)}
          >
            취소
          </button>
          <button
            className="text-gray-500 text-sm m-1  whitespace-nowrap hover:text-gray-100"
            onClick={(e) => {
              setEdit(!edit);
              handleEdited(e);
            }}
          >
            완료
          </button>
        </span>
      )}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { updateInfo } from "../../apis/api";

export const InfoElement = (props) => {
  const { infoContent, infoTitle } = props;
  const [content, setContent] = useState(infoContent);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditInfo = (e) => {
    e.preventDefault();
    updateInfo({ [infoTitle]: content });
  };

  // 이게 없을 경우 content에 초기값 설정이 안됨. 왜 그런걸까?
  useEffect(() => {
    setContent(infoContent);
  }, [infoContent]);

  return (
    <div className="w-full flex flex-col">
      <label className="label">{infoTitle}:</label>
      <div className="w-full flex mb-2 justify-between">
        {isEdit ? (
          <input
            id={infoTitle}
            className="input mr-4"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        ) : (
          <p className="text-lg mr-4 input">{content}</p>
        )}
        <div className="w-1/4 flex flex-row-reverse items-center">
          {isEdit ? (
            <>
              <button
                className="mr-3 button"
                onClick={(e) => handleEditInfo(e)}
              >
                Done
              </button>
              <button
                className="mr-3 button"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setContent(infoContent);
                }}
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button
                className="mr-3 button"
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

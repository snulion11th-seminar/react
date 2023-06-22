import { useEffect, useState } from "react";
import { updateUserInfo } from "../apis/api";

export const MyInfoElement = (props) => {
  const { infoLabel, infoContent } = props;
  const [content, setContent] = useState(infoContent);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditInfo = (e) => {
    e.preventDefault();
    updateUserInfo({ [infoLabel]: content });
    setContent(infoContent);
  };

  useEffect(() => {
    setContent(infoContent);
  }, [infoContent]);

  return (
    <div className="w-full flex-col mb-2">
      <p>{infoLabel}: </p>
      <div className="w-full flex mb-2 justify-between">
        <div className="w-full">
          {isEdit ? (
            <div className="w-full flex flex-col items-center">
              <input
                className="input m-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <button className="button" onClick={(e) => handleEditInfo(e)}>
                  수정하기
                </button>
                <button
                  className="button mr-3"
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setContent(infoContent);
                  }}
                >
                  취소하기
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-row justify-center p-2 mb-5 border-b-2">
              <p className="w-full text-lg mr-5 p-3">{infoContent}</p>
              <button className="button w-20" onClick={() => setIsEdit(!isEdit)}>
                변경
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
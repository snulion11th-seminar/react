// import React from "react";
// import { useEffect, useState } from "react";
// import commentList from "../../data/comment";
// import { getUser } from "../../apis/api";
// import { getCookie } from "../../utils/cookie";

// const CommentElement = ({
//   id,
//   post,
//   created_at,
//   author,
//   content,
//   deleteComment,
//   editComment,
//   setEditingCommentId,
//   setEditingText,
//   editingCommentId,
//   editingText,
//   handleEditText,
// }) => {
//   const [user, setUser] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);

//   useEffect(() => {
//     // access_token이 있으면 유저 정보 가져옴
//     if (getCookie("access_token")) {
//       const getUserAPI = async () => {
//         const user = await getUser();
//         setUser(user);
//       };
//       getUserAPI();
//     }
//   }, []);

//   // comment created_at 전처리
//   const date = new Date(created_at);
//   const year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   month = month < 10 ? `0${month}` : month;
//   let day = date.getDate();
//   day = day < 10 ? `0${day}` : day;

//   const handleEditClick = () => {
//     setEditingCommentId(id);
//     setEditingText(content);
//   };

//   const handleEditSubmit = () => {
//     editComment(id);
//   };

//   return (
//     <div>
//       <div className="w-full flex flex-row">
//         <div className="w-full flex justify-between gap-1 mb-2">
//           <div className="ml-4 w-full">
//             {editingCommentId === id ? (
//               <>
//                 <div className="flex flex-row">
//                   <input
//                     type="text"
//                     value={editingText}
//                     onChange={handleEditText}
//                     className="border-[1px] border-black w-full px-6 py-3 rounded-md text-black bg-transparent placeholder-opacity-50 focus:outline-none focus:ring-[1px] focus:ring-lime-400 focus:border-transparent h-14"
//                   />
//                   <button
//                     className="text-black w-14"
//                     onClick={handleEditSubmit}
//                   >
//                     ✅
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className="text-lg mr-4">{content}</p>
//                 <span className="text-base mr-1 text-gray-400">
//                   {year}.{month}.{day}
//                 </span>
//               </>
//             )}
//           </div>
//           {user?.id === author ? (
//           <div className="w-1/4 flex flex-row-reverse items-center">
//                     {!isEdit && (
//             <button className="button" onClick={() => deleteComment(id)}>
//               🗑️
//             </button>
//             )}
//             {editingCommentId !== id && (
//               <button
//                 className="button selection:mr-3"
//                 onClick={handleEditClick}
//               >
//                 🖋️
//               </button>
//             )}
//           </div>
//         </div>{" "}
//       </div>
//     </div>
//   );
// };

// export default CommentElement;

import React, { useEffect, useState } from "react";
import { getUser, updateComment } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

const CommentElement = ({
  id,
  post,
  created_at,
  author,
  content,
  deleteComment,
  editComment,
  setEditingCommentId,
  setEditingText,
  editingCommentId,
  editingText,
  handleEditText,
}) => {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  // comment created_at 전처리
  const date = new Date(created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const handleEditClick = () => {
    setEditingCommentId(id);
    setEditingText(content);
  };

  const handleEditSubmit = async () => {
    if (user && user.id === author) {
      await updateComment(id, { content: editingText });
      editComment(id);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-row">
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="ml-4 w-full">
            {editingCommentId === id ? (
              <>
                <div className="flex flex-row">
                  <input
                    type="text"
                    value={editingText}
                    onChange={handleEditText}
                    className="border-[1px] border-black w-full px-6 py-3 rounded-md text-black bg-transparent placeholder-opacity-50 focus:outline-none focus:ring-[1px] focus:ring-lime-400 focus:border-transparent h-14"
                  />
                  <button
                    className="text-black w-14"
                    onClick={handleEditSubmit}
                  >
                    ✅
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg mr-4">{content}</p>
                <span className="text-base mr-1 text-gray-400">
                  {year}.{month}.{day}
                </span>
              </>
            )}
          </div>
          {user?.id === author ? (
            <div className="w-1/4 flex flex-row-reverse items-center">
              {!isEdit && (
                <button className="button" onClick={() => deleteComment(id)}>
                  🗑️
                </button>
              )}
              {editingCommentId !== id && (
                <button
                  className="button selection:mr-3"
                  onClick={handleEditClick}
                >
                  🖋️
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentElement;

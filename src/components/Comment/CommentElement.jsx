const CommentElement = (props) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리

  // props로 받은내용으로 채우기
  const comment = {};

  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  <div className="w-full flex justify-between gap-1 mb-2">
    <div className="w-3/4">
      {/* 수정중일때와 아닐때를 다르게 보여줘야겠지
      {수정중 ? <input /> : <p>{내용}</p>}
      날짜 */}
      <span className="text-base mr-1 text-gray-300">
        {year}.{month}.{day}
      </span>
      {/* 수정, 삭제버튼 */}
      <div className="w-1/4 flex flex-row-reverse items-center">
        {/* delete 버튼은 수정이 아닐때만 보이게 해줘 */}
      </div>
    </div>
  </div>;
};

export default CommentElement;

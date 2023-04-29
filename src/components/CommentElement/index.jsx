const CommentElement = ({ comment }) => {
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  const day = date.getDate();

  return (
    <div className="flex justify-between">
      <p className="text-lg mr-4">{comment.content}</p>
      <span>
        {year}.{month}.{day}
      </span>
    </div>
  );
}

export default CommentElement;
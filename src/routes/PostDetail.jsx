import Comments from "../components/Comments";

const PostDetail = ({ title, content, tags }) => {
  //TODO : tags="고양이, 야옹야옹, 강아지, 멍멍" parsing
  tags = ["고양이", "야옹야옹"];
  return (
    <div>
      <div>Detail</div>
      <div className="mt-40 bg-slate-500">
        <div className="post-detail-wrapper">
          <div className="post-detail-title">제목 : {title}</div>
          <div className="post-detail-content">내용 : {content}</div>
          {tags.map((tag) => (
            <div className="post-detail-tag">태그 : {tag}</div>
          ))}
        </div>
        <Comments />
      </div>
    </div>
  );
};

export default PostDetail;

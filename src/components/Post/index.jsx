import "./Post.css";

const Post = ({title, content}) => {
    return (
        <div className="post-wrapper">
            <div className="post-title">제목 : {title}</div>
            <div className="post-content">내용 : {content}</div>     
        </div>
    )
}

export default Post;
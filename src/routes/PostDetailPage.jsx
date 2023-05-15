import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import posts from "../data/posts";

const PostDetailPage = () => {
// parameter로 받은 id에 해당하는 post를 찾아서 넣자
// TODO : api call(get post by id)
const { postId } = useParams();
const [post, setPost] = useState();
useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setPost(post);
}, [postId]);


const onClickDelete = () => {
    console.log("delete");
    // add api call for deleting post here
    // add redirect to home page
};


return (
    post && (
    <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />

				<div>
    <Link to={`/${post.id}/edit`}>
            <button className="button mt-10 mx-4 py-2 px-10">Edit</button>
    </Link>
    <button className="button mt-10 mx-4 py-2 px-10" onClick={onClickDelete}>Delete</button>
        </div>

    </div>
    )
);
};

export default PostDetailPage;
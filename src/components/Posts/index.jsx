import { Link } from "react-router-dom";

export const SmallPost = ({post}) => {
    return (
        <Link to={`/${post.id}`} className="mr-10 border border-slate-700 p-5 rounded-xl">
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
            <div>
                <span>#tag1</span>
                <br />
                <span>#tag2</span>
                <br />
                <span>#tag2</span>
                <br />
            </div>
        </Link>
    )
};

export const BigPost = ({post}) => {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div>
                <span>#tag1</span>
                <br />
                <span>#tag2</span>
                <br />
                <span>#tag2</span>
                <br />
            </div>
        </div>
    )
};

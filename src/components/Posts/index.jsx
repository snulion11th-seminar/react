import { Link } from "react-router-dom";

export const SmallPost = ({post}) => {
    return (
        <div  className="group mr-10 bg-slate-200 hover:bg-sky-300 hover:text-white hover:outline-none hover:ring-8 hover:ring-sky-200 rounded-xl font-medium">
            <Link to={`/${post.id}`} className="block p-5">
                <h1 className="font-extrabold text-2xl">{post.title}</h1>
                <p className="mt-2">{post.summary}</p>
                <div className="flex mt-5">
                    <span className="tag mr-2">#tag1</span>
                    <br />
                    <span className="tag mr-2">#tag2</span>
                    <br />
                    <span className="tag">#tag2</span>
                    <br />
                </div>
            </Link>
        </div>
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

import { Link } from "react-router-dom";
import { SmallPost } from "../components/Posts";

const  posts = [
    {
        id: 1,
        title: "#1 post",
        description: "My Number one post description",
        summary: "number one summary"
    },
    {
        id: 2,
        title: "#2 post",
        description: "My Number two post description",
        summary: "number two summary"
    },
    {
        id: 3,
        title: "#3 post",
        description: "My Number three post description",
        summary: "number three summary"
    },
    {
        id: 4,
        title: "#4 post",
        description: "My Number four post description",
        summary: "number four summary"
    }, 
]


const Home = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-72 bg-slate-600 mb-5">
                <h1 className="uppercase text-6xl mb-3">my blog</h1>
                <input type="text" placeholder="TAG SEARCH" className="border-2 border-orange-400 outline-none rounded-2xl text-center py-2 px-20 text-orange-400" />
            </div>

            <div className="flex flex-wrap mt-10 justify-center">
                {posts.map((post) => (
                    <SmallPost key={post.id} post={post} />
                    )
                )}
            </div>

            <div className="flex justify-center mt-20">
                <button className="button">
                    <Link to="/create" className="block p-4">글 작성하기</Link> 
                </button>
            </div>
        </div>
    )
};

export default Home;
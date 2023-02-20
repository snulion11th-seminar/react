import { Link } from "react-router-dom";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";


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
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
            <div>
                <h1 className="bg-red-300 text-center text-lg">SNULion's Blog</h1>
                <p className="bg-yellow-100 text-center text-base">아기사자 파이팅</p>
            </div>

            <div className="flex flex-wrap mt-10 justify-center">
                {posts.map((post) => (
                    <SmallPost key={post.id} post={post} />
                    )
                )}
            </div>

            <div className="flex justify-center mt-20">
                <Link to="/create" className="p-5 bg-orange-400 rounded-xl">글 작성하기</Link>
            </div>
        </div>
    )
};

export default Home;
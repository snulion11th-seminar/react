import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SmallPost } from "../components/Posts";
import posts from "../data/posts";


const Home = () => {
    const [tags, setTags] = useState([]);
    const [searchTags, setSearchTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [postList, setPostList] = useState(posts);

    useEffect(() => {
        const tagList = posts.reduce((acc, post) => {
            for (let tag of post.tags) {
                acc.add(tag);
            }
            return acc;
        }, new Set());
        setTags([...tagList]);
        setSearchTags([...tagList]);
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        const newTags = tags.filter((tag) => tag.includes(value));
        setSearchTags(newTags);
    }

    const handleTagFilter = (e) => {
        const { innerText } = e.target;
        const activeTag = innerText.substring(1);
        setSearchValue(activeTag);
        const newPosts = posts.filter((post) => post.tags.includes(activeTag));
        setPostList(newPosts);
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center h-72 bg-[url('https://www.codelion.net/codelion_thumb.jpg')] bg-center bg-cover mb-5">
                <h1 className="uppercase text-6xl mb-3">my blog</h1>
                <input 
                    type="text" 
                    placeholder="Tag Search" 
                    onChange={handleChange}
                    className="border border-orange-400 outline-none rounded-2xl text-center py-2 px-20 text-orange-400 bg-transparent" />
                <div className="flex mt-5">
                      {searchTags.map((tag) => {
                        if (tag === searchValue) {
                            return (
                                <button 
                                    key={tag} 
                                    className="tag active mr-2"
                                    onClick={handleTagFilter}>
                                        #{tag}
                                </button>
                            )
                        }   else {
                            return (
                                <button 
                                   key={tag} 
                                   className="tag mr-2"
                                   onClick={handleTagFilter}>
                                       #{tag}
                               </button>
                               )
                        }
                    }
                )}
                </div>
            </div>

            <div className="flex flex-wrap mt-10 justify-center">
                {postList.map((post) => (
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
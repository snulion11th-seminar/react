import { useEffect, useState } from "react";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";
import { PostForm } from "../components/Form";
import { getTags, createPost } from "../apis/api";
import { useNavigate } from "react-router-dom";


const PostCreatePage = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
		// 화면그리기
	const [formData, setFormData] = useState({
		title: "",
   	 	content: "",
    	tags: [],
	});

	const [tags, setTags] = useState([]);
	useEffect(() => {
		const getTagsAPI = async () => {
		  const tags = await getTags();
		  const tagContents = tags.map((tag) => {
			return tag.content;
		  });
		  setTags(tagContents);
		};
		getTagsAPI();
	  }, []);

	// const navigate = useNavigate();

// const onSubmit = (e) => {
//     e.preventDefault();
//     createPost(formData, navigate);
//   };
	  
// 	useEffect(() => {
// 		const duplicatedTagList = posts.reduce((acc, post) => {
// 		for (let tag of post.tags) {
// 			acc.add(tag.content);
// 		}

// 		return acc;
// 		}, new Set());

// 		const tagList = [...duplicatedTagList];

// 		setTags([...tagList]);
// 	}, []);

const navigate = useNavigate();

const onSubmit = (e) => {
    e.preventDefault();
    createPost(formData, navigate);
  };

	return (
		<div className="flex flex-col items-center w-3/5">
      <h3 className="font-bold text-4xl">New Post</h3>
      <PostForm
        onSubmit={onSubmit}
        tags={tags}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
	);
	};

export default PostCreatePage;
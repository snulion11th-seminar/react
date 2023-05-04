import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import posts from "../data/posts";
import { Link } from "react-router-dom";
import { BigPost } from "../components/Posts";

const EditPost = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postId } = useParams();
  const [formData, setFormData] = useState(
    posts.find((post) => post.id === parseInt(postId))
  );

  //태그 ID값 부여 위함
  const nextTagId = useRef(10);

  //기존 태그 불러오기
  const [tags, setTags] = useState([]);

  //태그 Input 안에 값
  const [tagInputValue, setTagInputValue] = useState("");

  //자동완성 태그들
  const [autoCompletes, setAutoCompletes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTag = (e) => {
    setTagInputValue(e.target.value);
    if (e.target.value) {
      const autoCompleteData = tags.filter((tag) =>
        tag.content.includes(e.target.value)
      );
      setAutoCompletes(autoCompleteData);
    } else {
      setAutoCompletes([]);
    }
  };

  const addTag = (e) => {
    e.preventDefault();

    if (!formData.tags.find((tag) => tag.content === tagInputValue)) {
      console.log("1");
      if (tags.find((tag) => tag.content === tagInputValue)) {
        console.log("2");
        const selectedTag = tags.find((tag) => tag.content === tagInputValue);
        setFormData({
          ...formData,
          tags: [...formData.tags, selectedTag],
        });
        setTagInputValue("");
        setAutoCompletes([]);
      } else {
        setFormData({
          ...formData,
          tags: [
            ...formData.tags,
            { id: nextTagId.current, content: tagInputValue },
          ],
        });
        setTagInputValue("");
        setAutoCompletes([]);
        nextTagId.current += 1;
      }
    } else {
      setTagInputValue("");
      setAutoCompletes([]);
    }
  };

  const deleteTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleAutoCompletes = (autoComplete) => {
    const selectedTag = tags.find((tag) => tag === autoComplete);
    console.log(selectedTag);
    //아래 if문을 다르게 처리한 이유는 리액트는 객체를 얕은 비교하기 때문
    //객체의 내용이 동일하더라도 리액트에서는 formData안에 있는 태그와 selectedTag를 다르게 인식함
    //CreatePost에서 됐던 이유는 애초에 넣을때 seletedTag를 넣었기 때문
    //여기서 그렇게 인식을 못하는 이유는 formData에 초기에 있는 값은 posts에서 가져오기 때문
    //이거 얘기하면서 리액트 얕은 비교, 깊은 비교 설명해줘도 좋을듯
    if (!formData.tags.find((tag) => tag.id === selectedTag.id)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, selectedTag],
      });
      setTagInputValue("");
      setAutoCompletes([]);
    } else {
      //이미 있는데 누르면 일단 console로 띄우고 버튼 눌러도 새로운 태그 생성 안되게 해놨는데 그냥 알아서 하면 될듯..
      //그냥 alert를 뜨게 할수도 있고 뭐 알아서?
      setAutoCompletes([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.like_users = [];
    setIsSubmitted(true);
  };

  console.log(formData);

  useEffect(() => {
    const duplicatedTagList = posts.reduce((acc, post) => {
      for (let tag of post.tags) {
        acc.add(tag);
      }

      return acc;
    }, new Set());

    const tagList = [...duplicatedTagList].filter(
      (obj, i) =>
        [...duplicatedTagList].findIndex((obj2) => obj.id === obj2.id) === i
    );

    setTags([...tagList]);
  }, []);

  return (
    <>
      {isSubmitted ? (
        <div className="flex flex-col items-center w-3/5 p-8">
          <BigPost post={formData} />
          {/* <Comments /> */}
        </div>
      ) : (
        <div className="flex flex-col items-center w-3/5">
          <div className="flex w-full items-center">
            <Link to={`/${postId}`}>
              <button className="w-20">{`< Back`}</button>
            </Link>
            <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
          </div>
          <PostForm
            onSubmit={(e) => onSubmit(e)}
            handleChange={handleChange}
            tagInputValue={tagInputValue}
            handleTag={handleTag}
            addTag={addTag}
            deleteTag={deleteTag}
            formData={formData}
            autoCompletes={autoCompletes}
            handleAutoCompletes={handleAutoCompletes}
          />
        </div>
      )}
    </>
  );
};

export default EditPost;

import { useEffect, useState } from "react";
import { PostForm } from "../components/Form";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";

const CreatePost = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    id: posts.length,
    title: "",
    content: "",
    author: { id: posts.length, username: "베이비" },
    tags: [],
  });

  // 기존 태그 불러오기
  // TODO : api call(get all tags)
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const duplicatedTagList = posts.reduce((acc, post) => {
      for (let tag of post.tags) {
        acc.add(tag.content);
      }

      return acc;
    }, new Set());

    const tagList = [...duplicatedTagList];

    setTags([...tagList]);
  }, []);

  //태그 Input 안에 값
  const [tagInputValue, setTagInputValue] = useState("");

  //자동완성 태그들
  const [autoCompletes, setAutoCompletes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    //TODO : api connect
    e.preventDefault();

    const createdPost = {
      ...formData,
      like_users: [],
      tags: formData.tags.map((tag, idx) => {
        return { id: idx + 1, content: tag };
      }),
    };
    setFormData(createdPost);
    setIsSubmitted(true);
  };

  //태그 인풋 값 바뀌면 그에 따라서 자동 완성값들도 변경
  const handleTag = (e) => {
    setTagInputValue(e.target.value);
    if (e.target.value) {
      const autoCompleteData = tags.filter((tag) =>
        tag.includes(e.target.value)
      );
      setAutoCompletes(autoCompleteData);
      return;
    }
  };

  // 추가 버튼 혹인 엔터 누르면 태그 생성
  const addTag = (e) => {
    e.preventDefault();

    // 입력한 내용이 이미 등록된 태그면 그냥 등록 안됨
    if (formData.tags.find((tag) => tag === tagInputValue)) return;

    setFormData({
      ...formData,
      tags: [...formData.tags, tagInputValue],
    });

    setTagInputValue("");
    setAutoCompletes([]);
  };

  // X버튼 눌렀을때 태그 삭제
  const deleteTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  // 자동완성 값이 있는 버튼을 눌렀을 때 이를 태그에 등록
  const handleAutoCompletes = (autoComplete) => {
    const selectedTag = tags.find((tag) => tag === autoComplete);

    if (formData.tags.includes(selectedTag)) return;

    setFormData({
      ...formData,
      tags: [...formData.tags, selectedTag],
    });
    setTagInputValue("");
    setAutoCompletes([]);
  };

  return (
    <>
      {isSubmitted ? (
        <div className="flex flex-col items-center w-3/5 p-8">
          <BigPost post={formData} />
          {/* <Comments /> */}
        </div>
      ) : (
        <div className="flex flex-col items-center w-3/5">
          <h3 className="font-bold text-4xl">New Post</h3>
          <PostForm
            onSubmit={onSubmit}
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

export default CreatePost;

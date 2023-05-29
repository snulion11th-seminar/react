import { useState } from "react";
import { deleteTagAPI } from "../../apis/api";

export const MyPageForm = ({ formData, setFormData, handleMyPageSubmit }) => {
  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form className="form" onSubmit={handleMyPageSubmit}>
      <label htmlFor="email" className="label">
        *email:
      </label>
      <div className="flex flex-row w-full">
        <input
          required
          type="email"
          id="email"
          className="input"
          value={formData.email}
          onChange={handleFormData}
        />
        <button className="button selection:mr-3">🖋️</button>
      </div>

      <label required htmlFor="username" className="label">
        *이름:
      </label>
      <div className="flex flex-row w-full">
        <input
          required
          type="text"
          id="username"
          className="input"
          onChange={handleFormData}
          value={formData.username}
        />
        <button className="button selection:mr-3">🖋️</button>
      </div>

      <label htmlFor="college" className="label">
        대학:{" "}
      </label>
      <div className="flex flex-row w-full">
        <input
          type="text"
          id="college"
          className="input"
          onChange={handleFormData}
          value={formData.college}
        />
        <button className="button selection:mr-3">🖋️</button>
      </div>
      <label htmlFor="major" className="label">
        전공:{" "}
      </label>
      <div className="flex flex-row w-full">
        <input
          type="text"
          id="major"
          className="input"
          onChange={handleFormData}
          value={formData.major}
        />
        <button className="button selection:mr-3">🖋️</button>
      </div>
    </form>
  );
};

export const SignUpForm = ({ formData, setFormData, handleSignUpSubmit }) => {
  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form className="form" onSubmit={handleSignUpSubmit}>
      <label htmlFor="email" className="label">
        *email:
      </label>
      <input
        required
        type="email"
        id="email"
        className="input"
        value={formData.email}
        onChange={handleFormData}
      />

      <label htmlFor="password" className="label">
        *password:
      </label>
      <input
        required
        type="password"
        id="password"
        className="input"
        onChange={handleFormData}
        value={formData.password}
      />

      <label htmlFor="confirm_password" className="label">
        *passoword 확인:{" "}
      </label>
      <input
        required
        type="password"
        id="confirm_password"
        className="input"
        onChange={handleFormData}
        value={formData.confirm_password}
      />

      <label required htmlFor="username" className="label">
        *이름:
      </label>
      <input
        required
        type="text"
        id="username"
        className="input"
        onChange={handleFormData}
        value={formData.username}
      />

      <label htmlFor="college" className="label">
        대학:{" "}
      </label>
      <input
        type="text"
        id="college"
        className="input"
        onChange={handleFormData}
        value={formData.college}
      />

      <label htmlFor="major" className="label">
        전공:{" "}
      </label>
      <input
        type="text"
        id="major"
        className="input"
        onChange={handleFormData}
        value={formData.major}
      />

      <button type="submit" className="button mt-7">
        Sign up !
      </button>
    </form>
  );
};

export const SignInForm = ({ formData, setFormData, handleSignInSubmit }) => {
  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form className="form" onSubmit={handleSignInSubmit}>
      <label htmlFor="username" className="label">
        *username:
      </label>
      <input
        required
        type="text"
        id="username"
        className="input"
        onChange={handleFormData}
        value={formData.username}
      />
      <label htmlFor="password" className="label">
        *password:
      </label>
      <input
        required
        type="password"
        id="password"
        className="input"
        onChange={handleFormData}
        value={formData.password}
      />
      <button type="submit" className="button mt-7">
        Sign in !
      </button>
    </form>
  );
};

export const PostForm = ({
  onSubmit,
  tags,
  formData,
  setFormData,
  setTags,
  handleCreateTag,
}) => {
  //태그 Input 안에 값
  const [tagInputValue, setTagInputValue] = useState("");

  //자동완성 태그들
  const [autoCompletes, setAutoCompletes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //태그 인풋 값 바뀌면 그에 따라서 자동 완성값들도 변경

  const handleTag = (e) => {
    setTagInputValue(e.target.value);
    if (e.target.value) {
      const autoCompleteData = tags.filter(
        (tag) => typeof tag === "string" && tag.includes(e.target.value)
      );
      setAutoCompletes(autoCompleteData);
    }
  };

  // 자동성 값이 있는 버튼을 눌렀을 때 이를 태그에 등록
  const handleAutoCompletes = (autoComplete) => {
    if (formData.tags.includes(autoComplete)) return;

    setFormData({
      ...formData,
      tags: [...formData.tags, autoComplete],
    });
    setTagInputValue("");
    setAutoCompletes([]);
  };

  const addTag = (e) => {
    e.preventDefault();
    if (!Array.isArray(formData.tags)) return;

    // Check if formData.tags is defined and an array before using the find method
    if (
      Array.isArray(formData.tags) &&
      formData.tags.find((tag) => tag === tagInputValue)
    ) {
      return;
    }

    const newTag = { id: Date.now().toString(), content: tagInputValue }; // Create a new tag object
    setTags([...tags, newTag]); // Add the new tag to the tags state
    setFormData({
      ...formData,
      tags: [...formData.tags, tagInputValue],
    });

    setTagInputValue("");
    setAutoCompletes([]);
  };

  const deleteTag = async (tag) => {
    try {
      // Call the delete API
      await deleteTagAPI(tag.id);

      // Update local state
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: prevFormData.tags.filter((t) => t.content !== tag.content),
      }));
      setTags((prevTags) => prevTags.filter((t) => t.content !== tag.content));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="title" className="label">
        Title
      </label>
      <input
        type="text"
        placeholder="Type title.."
        id="title"
        value={formData.title}
        className="input"
        onChange={handleChange}
        required
      />
      <label htmlFor="content" className="label">
        Content
      </label>
      <textarea
        placeholder="Type Content.."
        id="content"
        value={formData.content}
        cols="30"
        rows="10"
        className="input"
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="tags" className="label">
        Tags
      </label>
      <div className="flex w-full flex-col">
        <div className="flex  w-full gap-x-5">
          <input
            type="text"
            placeholder="Add Tags.."
            id="tags"
            value={tagInputValue}
            className="input grow"
            onChange={handleTag}
          />
          <button onClick={addTag} className="small-button w-16">
            add
          </button>
        </div>
        <div className="flex mt-2 bg-black border-gray-500 rounded-2xl w-full">
          {autoCompletes &&
            autoCompletes.map((autoComplete) => (
              <button
                className="tag rounded-2xl text-start border-gray-500 py-2 px-3 text-white focus:bg-gray"
                key={autoComplete}
                onClick={() => handleAutoCompletes(autoComplete)}
              >
                #{autoComplete}
              </button>
            ))}
        </div>
      </div>
      {tags && (
        <div className="flex w-full mt-3 gap-x-1 flew-nowrap">
          {tags.map((tag) => (
            <div key={tag.id} className="flex">
              <span className="tag active m-1 flex flex-row items-center gap-x-2">
                <p>#{tag.content}</p>
              </span>
              {/* 삭제버튼 */}
              <div
                className="after:content-['\00d7'] text-xl cursor-pointer"
                onClick={() => deleteTag(tag)}
              ></div>
            </div>
          ))}
        </div>
      )}
      <button type="submit" className="button mt-7">
        Submit
      </button>
    </form>
  );
};

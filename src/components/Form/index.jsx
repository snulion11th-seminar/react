import { useState } from "react";

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
					onChange={handleFormData}
          value={formData.email}
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

        <label required htmlFor="name" className="label">
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
				{/* 수정 👆🏻 */}
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

export const PostForm = ({ onSubmit, tags, formData, setFormData }) => {
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
        const autoCompleteData = tags.filter((tag) =>
          tag.includes(e.target.value)
        );
        setAutoCompletes(autoCompleteData);
      }
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
        {formData.tags && (
          <div className="flex w-full mt-3 gap-x-1 flew-nowrap">
            {formData.tags.map((tag) => (
              <div key={tag} className="flex">
                <span className="tag active m-1 flex flex-row items-center gap-x-2">
                  <p>#{tag}</p>
                </span>
                {/* 삭제버튼 */}
                <button
                  className="after:content-['\00d7'] text-xl"
                  onClick={() => deleteTag(tag)}
                />
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
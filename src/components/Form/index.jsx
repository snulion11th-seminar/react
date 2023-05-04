export const SignUpForm = () => {
  const handleSignUpSubmit = () => {
    alert("회원가입 완료!");
  };

  return (
    <form className="form" onSubmit={handleSignUpSubmit}>
      <label htmlFor="email" className="label">
        *email:
      </label>
      <input required type="text" name="email" className="input" />

      <label htmlFor="password" className="label">
        *password:
      </label>
      <input required type="password" name="password" className="input" />

      <label htmlFor="confirm_password" className="label">
        *passoword 확인:{" "}
      </label>
      <input
        required
        type="password"
        name="confirm_password"
        className="input"
      />

      <label required htmlFor="name" className="label">
        *이름:
      </label>
      <input required type="text" name="username" className="input" />

      <label htmlFor="college" className="label">
        대학:{" "}
      </label>
      <input required type="text" name="college" className="input" />

      <label htmlFor="major" className="label">
        전공:{" "}
      </label>
      <input type="text" name="major" className="input" />

      <button type="submit" className="button mt-7">
        Sign up !
      </button>
    </form>
  );
};

export const SignInForm = () => {
  const handleSignInSubmit = () => {
    alert("로그인 완료!");
  };

  return (
    <form className="form" onSubmit={handleSignInSubmit}>
      <label htmlFor="email" className="label">
        *email:
      </label>
      <input required type="text" name="email" className="input" />
      <label htmlFor="password" className="label">
        *password:
      </label>
      <input required type="password" name="password" className="input" />
      <button type="submit" className="button mt-7">
        Sign in !
      </button>
    </form>
  );
};

export const PostForm = ({
  onSubmit,
  handleChange,
  tagInputValue,
  handleTag,
  addTag,
  deleteTag,
  formData,
  autoCompletes,
  handleAutoCompletes,
}) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="title" className="label">
        title
      </label>
      <input
        type="text"
        placeholder="Type title.."
        name="title"
        value={formData.title}
        className="input"
        onChange={handleChange}
      />
      <label htmlFor="content" className="label">
        content
      </label>
      <textarea
        placeholder="Type Content.."
        name="content"
        value={formData.content}
        cols="30"
        rows="10"
        className="input"
        onChange={handleChange}
      ></textarea>
      <label htmlFor="tags" className="label">
        tags
      </label>
      <div className="flex w-full flex-col">
        <div className="flex  w-full gap-x-5">
          <input
            type="text"
            placeholder="Add Tags.."
            name="tags"
            value={tagInputValue}
            className="input grow"
            onChange={handleTag}
          />
          <button onClick={addTag} className="small-button w-16">
            추가
          </button>
        </div>
        <div className="flex bg-white border-gray-500 rounded-2xl w-full flex-col">
          {autoCompletes
            ? autoCompletes.map((autoComplete) => (
                <button
                  className="w-full rounded-2xl text-start border-gray-500 py-3 px-3 text-black focus:bg-gray"
                  key={autoComplete.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAutoCompletes(autoComplete);
                  }}
                >
                  #{autoComplete.content}
                </button>
              ))
            : null}
        </div>
      </div>
      {formData.tags ? (
        <div className="flex w-full mt-3 gap-x-1 flew-nowrap">
          {formData.tags.map((tag) => (
            <div key={tag.id} className="flex">
              <span className="tag active m-1 flex flex-row items-center gap-x-2">
                <p>#{tag.content}</p>
              </span>
              {/* 삭제버튼 */}
              <button
                className="after:content-['\00d7'] text-xl"
                onClick={(e) => {
                  e.preventDefault();
                  deleteTag(tag);
                }}
              ></button>
            </div>
          ))}
        </div>
      ) : null}
      <button type="submit" className="button mt-7">
        Submit
      </button>
    </form>
  );
};

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

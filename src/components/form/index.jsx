export const SignUpForm = () => {
  return (
    <div>
      <form className="flex flex-col">
        <label required for="email">
          *email:
        </label>
        <input type="text" name="email" />
        <label required for="password">
          *passoword:
        </label>
        <input type="text" name="password" />
        <label for="confirm_password">*passoword 확인: </label>
        <input type="text" name="confirm_password" />
        <label for="name">이름:</label>
        <input type="text" name="username" />
        <label for="college">대학: </label>
        <input type="text" name="college" />
        <label for="major">전공: </label>
        <input type="text" id="major" />
        <button type="submit" text="Sign up !" />
      </form>
    </div>
  );
};

export const SignInForm = () => {
  return (
    <div>
      <form className="flex flex-col">
        <label required for="email">
          *email:
        </label>
        <input type="text" name="email" />
        <label required for="password">
          *passoword:
        </label>
        <input type="text" name="password" />
      </form>
    </div>
  );
};

export const PostForm = ({
  onSubmit,
  handleChange,
  formData,
}) => {
  return (
    <form className="flex flex-col py-50 bg-slate-500 text-black" onSubmit={onSubmit}>
      <h3 id="create-post-header">new post</h3>
      <span id="title">title</span>
      <input type="text" name="title" value={formData.name} id="create-post-title-input" onChange={handleChange} />
      <span id="content">content</span>
      <textarea
        name="content"
        value={formData.content}
        cols="30"
        rows="10"
        id="create-post-content-input"
        onChange={handleChange}
      ></textarea>
      <span id="tag">tag</span>
      <input type="text" value={formData.tag} name="tag" id="create-post-tag-input" onChange={handleChange} />
      <button id="create-post-btn">제출하기</button>
    </form>
  );
};

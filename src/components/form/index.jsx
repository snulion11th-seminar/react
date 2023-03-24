export const SignUpForm = () => {
  return (
    <form className="form">
      <label for="email" className="label">
        *email:
      </label>
      <input required type="text" name="email" className="input" />

      <label for="password" className="label">
        *password:
      </label>
      <input required type="text" name="password" className="input" />

      <label for="confirm_password" className="label">
        *passoword 확인:{" "}
      </label>
      <input required type="text" name="confirm_password" className="input" />

      <label for="name" className="label">
        이름:
      </label>
      <input required type="text" name="username" className="input" />

      <label for="college" className="label">
        대학:{" "}
      </label>
      <input required type="text" name="college" className="input" />

      <label for="major" className="label">
        전공:{" "}
      </label>
      <input type="text" name="major" className="input" />

      <button type="submit" text="Sign up !" />
    </form>
  );
};

export const SignInForm = () => {
  return (
    <form className="form">
      <label for="email" className="label">
        *email:
      </label>
      <input required type="text" name="email" className="input" />
      <label for="password" className="label">
        *password:
      </label>
      <input required type="text" name="password" className="input" />
    </form>
  );
};

export const PostForm = ({ onSubmit, handleChange, handleTag, formData }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label for="title" className="label">
        title
      </label>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={formData.title}
        name="title"
        className="input"
        onChange={handleChange}
      />

      <label for="content" className="label">
        content
      </label>
      <textarea
        placeholder="내용을 입력해주세요"
        value={formData.content}
        name="content"
        cols="30"
        rows="10"
        className="input"
        onChange={handleChange}
      ></textarea>

      <label for="tags" className="label">
        tags
      </label>
      <input
        type="text"
        placeholder="태그를 입력해주세요"
        className="input"
        value={formData.tags}
        name="tags"
        onChange={handleTag}
      />

      <button type="submit" className="button px-12 py-3 mt-7">
        제출하기
      </button>
    </form>
  );
};

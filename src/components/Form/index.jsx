export const SignUpForm = () => {
  const handleSignUpSubmit = () => {
    alert("회원가입 완료!");
  };

  return (
    <form className="form" onSubmit={handleSignUpSubmit}>
      <label htmlFor="email" className="label">
        *email:
      </label>
      <input required type="text" id="email" className="input" />

      <label htmlFor="password" className="label">
        *password:
      </label>
      <input required type="password" id="password" className="input" />

      <label htmlFor="confirm_password" className="label">
        *passoword 확인:{" "}
      </label>
      <input required type="password" id="confirm_password" className="input" />

      <label required htmlFor="name" className="label">
        *이름:
      </label>
      <input required type="text" id="username" className="input" />

      <label htmlFor="college" className="label">
        대학:{" "}
      </label>
      <input required type="text" id="college" className="input" />

      <label htmlFor="major" className="label">
        전공:{" "}
      </label>
      <input type="text" id="major" className="input" />

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
      <input required type="text" id="email" className="input" />
      <label htmlFor="password" className="label">
        *password:
      </label>
      <input required type="password" id="password" className="input" />
      <button type="submit" className="button mt-7">
        Sign in !
      </button>
    </form>
  );
};

export const PostForm = ({ onSubmit, handleChange, handleTag, formData }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="title" className="label">
        title
      </label>
      <input
        type="text"
        placeholder="Type title.."
        id="title"
        value={formData.title}
        className="input"
        onChange={handleChange}
      />
      <label htmlFor="content" className="label">
        content
      </label>
      <textarea
        placeholder="Type Content.."
        id="content"
        value={formData.content}
        cols="30"
        rows="10"
        className="input"
        onChange={handleChange}
      ></textarea>
      <label htmlFor="tags" className="label">
        tags
      </label>
      <input
        type="text"
        placeholder="Add Tags.."
        id="tags"
        value={formData.tags}
        className="input"
        onChange={handleTag}
      />
      <button type="submit" className="button mt-7">
        Submit
      </button>
    </form>
  );
};

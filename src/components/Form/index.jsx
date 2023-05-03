export const SignUpForm = () => {
  return (
    <form className="form">
      <label htmlFor="email" className="label">
        *email:
      </label>
      <input required type="text" name="email" className="input" />

      <label htmlFor="password" className="label">
        *password:
      </label>
      <input required type="text" name="password" className="input" />

      <label htmlFor="confirm_password" className="label">
        *passoword 확인:{" "}
      </label>
      <input required type="text" name="confirm_password" className="input" />

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
  return (
    <form className="form">
      <label htmlFor="email" className="label">
        *email:
      </label>
      <input required type="text" name="email" className="input" />
      <label htmlFor="password" className="label">
        *password:
      </label>
      <input required type="text" name="password" className="input" />
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
      <input
        type="text"
        placeholder="Add Tags.."
        name="tags"
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

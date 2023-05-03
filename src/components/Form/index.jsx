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

      <button type="submit" className="button mt-7">
        Sign up !
      </button>
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
      <button type="submit" className="button mt-7">
        Sign in !
      </button>
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
        placeholder="Type title.."
        name="title"
        value={formData.title}
        className="input"
        onChange={handleChange}
      />
      <label for="content" className="label">
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
      <label for="tags" className="label">
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

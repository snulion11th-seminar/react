import { Link } from "react-router-dom";

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



export const SmallPost = ({ post }) => {
  const onClickLike = () => {
    console.log("나도 좋아!");
    // add api call for liking post here
  };

  return (
    <div className="w-64 relative block group py-10 px-8 mr-5 my-5 ring-8 ring-transparent border-2 border-box border-white hover:bg-orange-400 hover:text-black hover:border-transparent hover:ring-orange-200 rounded-xl font-medium">
      <h1 className="font-extrabold text-2xl truncate">{post.title}</h1>
      <p className="mt-2">{post.author.username}</p>
      <div className="flex flex-wrap mt-5">
        {post.tags.map((tag) => (
          <span key={tag.id} className="tag m-1">
            #{tag.content}
          </span>
        ))}
      </div>
      
      <div onClick={onClickLike}>
        {post.like_users.length > 0 && `❤️ ${post.like_users.length}`}
      </div>
      <Link to={`/${post.id}`}>
        <div className="absolute bottom-0 right-0 bg-orange-400 px-5 py-2 rounded-lg translate-x-5 translate-y-5">
          <span className="uppercase">detail</span>
        </div>
      </Link>
    </div>
  );
};


export const BigPost = ({ post }) => {
  const onClickLike = () => {
    console.log("나도 좋아!");
    // add api call for liking post here
  };

  return (
    <div className="py-5 w-full bg-orange-400 text-black border-0 ring-8 ring-orange-200 rounded-xl font-medium">
      <div className="px-8">
        <h1 className="font-extrabold text-2xl">{post.title}</h1>
        <span className="mt-2 text-white ">{post.author.username}</span>
        <div className="mt-2 h-28">{post.content}</div>
        <div className="flex mt-5">
          {post.tags &&  //태그가 있을때만 map을 돌려라
            post.tags.map((tag) => (
              <span key={tag.id} className="tag mr-2">
                #{tag.content}
              </span>
            ))}
        </div>
        <div className="flex mt-5" onClick={onClickLike}>
          ❤️ {post.like_users.length > 0 && `${post.like_users.length}`}
        </div>
      </div>
    </div>
  );
};


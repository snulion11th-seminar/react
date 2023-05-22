import { useState } from "react";
import { SignInForm } from "../components/Form";
import { signIn } from "../apis/api";
const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };
  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">Sign In</h3>
      {/* 추가 👇🏻 */}
      <SignInForm
        formData={formData}
        setFormData={setFormData}
        handleSignInSubmit={handleSignInSubmit}
      />
      {/* 추가 👆🏻 */}
    </div>
  );
};

export default SignInPage;

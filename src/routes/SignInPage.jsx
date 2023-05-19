import { useState } from "react";
import { SignInForm } from "../components/Form";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSignInSubmit = () => {
    console.log(formData);
    localStorage.setItem("username", formData.username);
    alert("로그인 완 료!");
    // add api call for sign in here
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">Sign In</h3>
      <SignInForm
        formData={formData}
        setFormData={setFormData}
        handleSignInSubmit={handleSignInSubmit}
      />
    </div>
  );
};

export default SignInPage;

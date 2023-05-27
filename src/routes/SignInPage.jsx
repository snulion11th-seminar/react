import { useState } from "react";
import { SignInForm } from "../components/Form";
import { signIn } from "../apis/api";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
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

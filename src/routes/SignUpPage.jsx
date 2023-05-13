import { useState } from "react";
import { SignUpForm } from "../components/Form";
import { signUp } from "../apis/api";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    college: "",
    major: "",
  });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">Sign Up</h3>
      <SignUpForm
        formData={formData}
        setFormData={setFormData}
        handleSignUpSubmit={handleSignUpSubmit}
      />
    </div>
  );
};

export default SignUpPage;

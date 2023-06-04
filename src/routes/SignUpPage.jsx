import { useState } from "react";
import { SignUpForm } from "../components/Form";
import axios from "axios";
import { getCookie } from "../utils/cookie";
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

  const handleSignUpSubmit = async (e) => {
    // API 호출하는 함수
    e.preventDefault(); // form 보낼 때 새로고침 안 되도록 해주세용 
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

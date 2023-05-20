import { useState } from "react";
import { SignUpForm } from "../components/Form";
import axios from "axios";

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
    e.preventDefault(); // 이벤트의 기본 동작을 막는다. (새로고침 방지)
    const response = await axios.post(
      "http://localhost:8000/api/account/signup/",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
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

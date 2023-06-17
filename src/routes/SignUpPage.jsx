import { useState } from "react";
import { SignUpForm } from "../components/Form";
import axios from "axios";
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

  // const handleSignUpSubmit = () => {
  //   console.log(formData);
  //   alert(`${formData.email}로 회원가입 해 줘`);
  //   // add api call for sign up here
  //   // 보통 api call 하는 친구는 페이지 단에 냅둔다.
  // };

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

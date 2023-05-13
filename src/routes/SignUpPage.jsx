import { useState } from "react";
import { SignUpForm } from "../components/Form";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    college: "",
    major: "",
  });

	const handleSignUpSubmit = () => {
	console.log(formData);
    alert(`${formData.email}로 회원가입 해 줘`);
	// add api call for sign up here
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
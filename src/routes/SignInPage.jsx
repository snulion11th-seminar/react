import { useState } from "react";
import { SignInForm } from "../components/Form";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSignInSubmit = () => {
    alert("로그인 완 료!");
    // add api call for sign in here
  };
  return (
    <div>
      <SignInForm
        formData={formData}
        setFormData={setFormData}
        handleSignInSubmit={handleSignInSubmit}
      />
    </div>
  );
};

export default SignInPage;

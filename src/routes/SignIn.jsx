import { SignInForm } from "../components/Form";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className=" font-bold text-4xl">Sign In</h3>
      <SignInForm />
    </div>
  );
};

export default SignIn;

import { UserLoginDetails } from "@/features/user";
import LoginForm from "../components/LoginForm";

export const Login = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-10 p-5">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <LoginForm />
      </div>
      <UserLoginDetails />
    </div>
  );
};

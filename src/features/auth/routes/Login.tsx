import { UserLoginDetails } from "@/features/user";
import LoginForm from "../components/LoginForm";

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <LoginForm />
      </div>
      <UserLoginDetails />
    </div>
  );
};

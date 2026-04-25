import { Button } from "@/components/Elements";
import React, { useState } from "react";
import { useLogin } from "../api/login";
import storage from "@/utils/storage";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isDisabled = !email.trim() || !password.trim();

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login attempt:", { email, password });
    if (email.trim() === "" || password.trim() === "") {
      return;
    }
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setIsLoading(false);
          storage.setAccessToken(data?.access_token);
          if (storage.getRedrictPath()) {
            const redirectPath = storage.getRedrictPath() as string;
            storage.setRedirectPath("");
            window.location.assign(redirectPath);
          } else if (data?.access_token) {
            window.location.assign("/app");
          }
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setIsLoading(false);
        },
      },
    );
    setIsLoading(true);
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
          BasketBay
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">Welcome!</h2>
        <p className="text-sm text-slate-500">
          Sign in to your account to continue to the demo shop.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@company.com"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-sm font-medium text-emerald-600 transition hover:text-emerald-500"
            >
              Forgot?
            </button>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isDisabled}
          className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New to BasketBay?{" "}
        <button
          type="button"
          disabled={true}
          className="font-medium text-emerald-600 transition hover:text-emerald-500"
        >
          Create an account
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Logo, Input, Button } from "./index";
import { useForm } from "react-hook-form";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function serverLogin(data) {
    setError("");
    console.log("Login >> ", data);
    try {
      const session = await authService.login(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) {
          dispatch(storeLogin(userdata));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center"> {error}</p>}
        <form onSubmit={handleSubmit(serverLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Email"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

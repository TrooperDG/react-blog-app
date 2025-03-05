import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { addUserDetails } from "../store/userSlice.js";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Logo, Input, Button } from "./index";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/database.js";

function Login() {
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function serverLogin(data) {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          const existingUser = await databaseService.getUser(userData.$id);
          if (existingUser) {
            dispatch(addUserDetails(existingUser));
          } else {
            const userDetails = await databaseService.createUser(userData.$id, {
              userEmail: userData.email,
              username: userData.name,
            });
            if (userDetails) {
              dispatch(addUserDetails(userDetails));
            }
          }

          navigate("/");
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block ">
            <Logo width="w-12" rounded="rounded-full" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center"> {error}</p>}
        <form onSubmit={handleSubmit(serverLogin)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className={error && "border-red-600"}
                onFocus={() => setError(false)}
                {...register("email", {
                  required: "Please enter your password",
                })}
              />
            </div>

            <div>
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                className={error && "border-red-600"}
                onFocus={() => setError(false)}
                {...register("password", {
                  required: "Please Enter your Email",
                })}
              />
              {error && (
                <p className="p-0 m-0 text-red-500 ">
                  Email or Password is invalid
                </p>
              )}
            </div>

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

import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login as storeLogin } from "../store/authSlice";
import { addUserDetails } from "../store/userSlice.js";

function Signup() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function serverSignup(data) {
    setError("");
    try {
      const createdUser = await authService.createAccount(data);
      if (createdUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(createdUser));

          const userDetails = await databaseService.createUser(userData.$id, {
            userEmail: userData.email,
            username: userData.name,
          });
          if (userDetails) {
            dispatch(addUserDetails(userDetails));
          }

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
          Create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log in
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center"> {error}</p>}
        <form onSubmit={handleSubmit(serverSignup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

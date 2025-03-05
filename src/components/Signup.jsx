import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login as storeLogin } from "../store/authSlice";
import { addUserDetails } from "../store/userSlice.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import databaseService from "../appwrite/database.js";

function Signup() {
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function serverSignup(data) {
    delete data.confirmPassword;
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
      } else {
        setServerError(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleRetry() {
    setServerError("");
    reset();
  }

  const password = watch("password");
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 relative`}
      >
        {/*for server related errors*/}
        {serverError && (
          <div className="absolute bg-black/50 rounded-lg inset-0 z-10 flex justify-center items-center">
            <div className=" bg-white max-w-full flex flex-col items-center p-4 rounded-lg">
              <h1 className="text-lg font-semibold text-red-500 mb-1">
                Something went wrong
              </h1>
              <p className="text-gray-700 font-semibold">
                Could not create account
              </p>
              <Button onClick={handleRetry} className="bg-green-600 mt-4">
                Retry
              </Button>
            </div>
          </div>
        )}
        <div className="mb-2 flex justify-center">
          <span className="inline-block">
            <Logo width="w-12" rounded="rounded-full" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600  text-primary transition-all duration-200 hover:underline"
          >
            Log in
          </Link>
        </p>
        <form onSubmit={handleSubmit(serverSignup)} className="mt-8">
          <div className="space-y-5">
            <div className="">
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                className={`${errors.name && "border-red-600"}`}
                {...register("name", {
                  required: "Username can not be empty",
                })}
              />
              {errors.name && (
                <p className="p-0 m-0 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                className={`${errors.email && "border-red-600"}`}
                {...register("email", {
                  required: "Email can not be empty",
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Invalid email format",
                  },
                })}
              />

              {errors.email && (
                <p className="p-0 m-0 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={` pr-10 ${errors.password && "border-red-600"}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password should contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password should contain at least one lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) ||
                      "Password should contain at least one number",
                    hasSpecialChar: (value) =>
                      /[@$!%*?&#]/.test(value) ||
                      "Password should contain at least one special character (#,@, $, !, %, *, ?, &)",
                  },
                })}
              />

              {errors.password && (
                <p className="p-0 m-0 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-10"
              >
                {showPassword ? (
                  <FaEye size={20} className="text-gray-600" />
                ) : (
                  <FaEyeSlash size={20} className="text-gray-600" />
                )}
              </button>
            </div>
            <div id="confirm-password" className="">
              <Input
                label="Confirm Password"
                type={"password"}
                placeholder="Enter confirm password"
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                className={` pr-10 ${
                  errors.confirmPassword && "border-red-600"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="p-0 m-0 text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
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

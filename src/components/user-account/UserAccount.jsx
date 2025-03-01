import React from "react";
import { Link } from "react-router-dom";
import databaseService from "../../appwrite/database";
import Button from "../utils/Button";

export default function UserAccount({ userDetails }) {
  return (
    <div className="user-info-container px-6 py-10 md:shadow-2xl md:py-20   rounded-lg ">
      {userDetails && (
        <>
          <div className="flex items-center gap-2  mb-6  relative ">
            {userDetails.avatar ? (
              <img
                src={databaseService.getFilePreview(userDetails.avatar)}
                alt={`${userDetails.username}'s avatar`}
                className="w-18 h-18 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <svg
                className="w-18 h-18 "
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6a7282"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
            )}
            <h1 className="text-2xl font-bold text-gray-600 text-wrap mb-1 ">
              {userDetails.username}
            </h1>

            <Link
              className="ml-auto absolute -right-2 top-0"
              to="/edit-account"
            >
              <button
                id="edit-account"
                className=" p-1 mr-2 rounded-md  flex items-center gap-1.5 bg-white  hover:bg-gray-100 active:bg-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#6a7282"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
                <span className="font-semibold text-gray-600">Edit</span>
              </button>
            </Link>
          </div>

          {/* Email */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Email</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.userEmail}
            </p>
          </div>

          {/* Address */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Address</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.address ? userDetails.address : "add your address"}
            </p>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Date of Birth</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.DOB ? userDetails.DOB : " Add your date of birth"}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Bio</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.bio ? userDetails.bio : "About yourself"}
            </p>
          </div>
        </>
      )}
      {/* Avatar and Username */}
    </div>
    // <h1>jsdjgf</h1>
  );
}

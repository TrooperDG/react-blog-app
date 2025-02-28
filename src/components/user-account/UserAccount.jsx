import React from "react";
import { Link } from "react-router-dom";
import databaseService from "../../appwrite/database";
import Button from "../utils/Button";

export default function UserAccount({ userDetails }) {
  return (
    <div className="user-info-container px-6 py-10 md:shadow-2xl md:py-20   rounded-lg ">
      {userDetails && (
        <>
          <div className="flex flex-wrap items-center space-x-4 mb-6">
            {userDetails.avatar ? (
              <img
                src={databaseService.getFilePreview(userDetails.avatar)}
                alt={`${userDetails.username}'s avatar`}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <svg
                className="w-20 h-20 "
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6a7282"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
            )}
            <h1 className="text-3xl font-bold text-gray-600">
              {userDetails.username}
            </h1>
            <Link className="ml-auto " to="/edit-account">
              <Button>Edit</Button>
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
